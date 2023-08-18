plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.mlytics.reactnative.mlyplayer"
    compileSdk = 33

    defaultConfig {
        minSdk = 26
//        targetSdk = 33

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        consumerProguardFiles("consumer-rules.pro")
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {

    implementation("androidx.core:core-ktx:1.8.0")
    implementation("androidx.appcompat:appcompat:1.4.1")
    implementation("com.google.android.material:material:1.5.0")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.3")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.4.0")
    implementation("com.facebook.react:react-native:0.71.0-rc.0")

    implementation("com.google.android.exoplayer:exoplayer:2.18.1")
//    implementation("com.mux.stats.sdk.muxstats:MuxExoPlayer_r2_18_1:3.0.1")
//    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.2")
//    implementation("org.webrtc:google-webrtc:1.0.32006")
    implementation("io.github.vip-test:vip-test:0.1.29")

//    implementation(project(":exoplayer"))
//    implementation(project(":mlysdk"))
}

configurations.all {
    exclude("com.google.protobuf", "protobuf-javalite")
}

repositories {
    google()
    mavenCentral()
    jcenter()
    maven { setUrl("https://muxinc.jfrog.io/artifactory/default-maven-release-local") }
}
