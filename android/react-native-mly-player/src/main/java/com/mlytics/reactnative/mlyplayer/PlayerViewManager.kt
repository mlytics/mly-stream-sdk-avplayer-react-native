package com.mlytics.reactnative.mlyplayer

import android.content.Context
import android.util.Log
import android.widget.TextView
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.google.android.exoplayer2.ExoPlayer
import com.google.android.exoplayer2.MediaItem
import com.google.android.exoplayer2.ui.StyledPlayerView
import com.mlytics.mlysdk.driver.pheripheral.player.MLYExoPlayer

@ReactModule(name = PlayerViewManager.NAME)
class PlayerViewManager : SimpleViewManager<StyledPlayerView?>() {

    companion object {
        const val NAME = "RCTMlyPlayer"
    }

    override fun getName(): String {
        return NAME
    }

    var view: StyledPlayerView? = null
    var player: ExoPlayer? = null

    override fun createViewInstance(reactContext: ThemedReactContext): StyledPlayerView {

        var view = StyledPlayerView(reactContext as Context)

        var player = MLYExoPlayer.build(view)
        view.player = player

        this.view = view
        this.player = player

        return view
    }

    override fun onDropViewInstance(view: StyledPlayerView) {
        super.onDropViewInstance(view)
        this.player?.stop()
    }

    @ReactProp(name = "autoplay", defaultBoolean = true)
    fun setAutoplay(view: StyledPlayerView, autoplay: Boolean) {
        Log.d("mly--", "autoplay=$autoplay")
        this.autoplay = autoplay
        this.player?.playWhenReady = autoplay

        if(this.src.isEmpty()) {
            return
        }
        if (autoplay) {
            this.player?.play()
        } else {
            this.player?.pause()
        }
    }

    @ReactProp(name = "muted", defaultBoolean = true)
    fun setMuted(view: StyledPlayerView, muted: Boolean) {
        Log.d("mly--", "muted=$muted")
        this.muted = muted
        this.player?.isDeviceMuted = muted
    }

    @ReactProp(name = "controls", defaultBoolean = true)
    fun setControls(view: StyledPlayerView, controls: Boolean) {
        Log.d("mly--", "controls=$controls")
        this.controls = controls
        this.view?.controllerAutoShow = controls
    }

    @ReactProp(name = "src")
    fun setSrc(view: StyledPlayerView, src: String) {
        Log.d("mly--", "src=$src")
        this.src = src
        if (src.isEmpty()) {
            return
        }
        this.player?.apply {
            setMediaItem(MediaItem.fromUri(src))
            prepare()
//            if (this@PlayerViewManager.autoplay) {
//                play()
//            }
        }

    }

    var src = ""
    var autoplay = true
    var muted = false
    var controls = true

}
