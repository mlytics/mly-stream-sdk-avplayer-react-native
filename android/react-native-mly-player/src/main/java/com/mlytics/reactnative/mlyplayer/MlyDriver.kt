package com.mlytics.reactnative.mlyplayer

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

class MlyDriver(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    companion object {
        const val NAME = "MlyDriver"
    }

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun init(options: ReadableMap) {
        Log.d("mly--", "init $options")
        com.mlytics.mlysdk.driver.MLYDriver.initialize(this.reactApplicationContext) {
            it.client.id = options.getString("clientId")
            options.getString("server")?.let { server ->
                it.server.fqdn = server
            }
            options.getBoolean("debug")?.let { debug ->
                it.debug = debug
            }
        }
    }

    @ReactMethod
    fun destroy() {
        Log.d("mly--", "destroy")
        com.mlytics.mlysdk.driver.MLYDriver.deactivate()
    }
}