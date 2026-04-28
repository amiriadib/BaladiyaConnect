import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export interface Report {
  id: string;
  latitude: number;
  longitude: number;
  type: string;
  status: 'En cours' | 'Validé' | 'Réparée';
  timestamp: any; // Firestore Timestamp
  userId?: string;
  description?: string;
  imageUrl?: string;
}

/**
 * Calculates distance between two coordinates in meters
 */
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Service to handle citizen reporting logic with Firestore
 */
export const ReportingService = {
  /**
   * Checks if a report already exists within a specified radius (default 50m)
   */
  checkForDuplicates: async (lat: number, lon: number, radiusMeters: number = 50): Promise<Report | null> => {
    try {
      // Query recent reports from Firestore
      // In a real app, we'd use geoqueries, but for this demo we'll fetch recent ones and filter
      const snapshot = await firestore()
        .collection('reports')
        .where('status', '==', 'En cours')
        .limit(20)
        .get();

      const reports = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Report[];

      const duplicate = reports.find(report => {
        const distance = getDistance(lat, lon, report.latitude, report.longitude);
        return distance <= radiusMeters;
      });

      return duplicate || null;
    } catch (error) {
      console.error('Error checking duplicates:', error);
      return null;
    }
  },

  /**
   * Submits a new report to Firestore
   */
  submitReport: async (reportData: Omit<Report, 'id' | 'timestamp' | 'status' | 'userId'>) => {
    const user = auth().currentUser;
    if (!user) throw new Error('User must be authenticated to submit a report');

    return firestore().collection('reports').add({
      ...reportData,
      userId: user.uid,
      status: 'En cours',
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
  },

  /**
   * Mock AI Image Classification
   */
  classifyImage: async (imageUri: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, we randomly select a common type
    const types = ['Déchets', 'Routes', 'Éclairage'];
    return types[Math.floor(Math.random() * types.length)];
  }
};
