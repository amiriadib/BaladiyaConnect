package com.myapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class DashboardActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // This links to the XML layout you created in the 'res/layout' folder
        setContentView(R.layout.activity_dashboard)
    }
}