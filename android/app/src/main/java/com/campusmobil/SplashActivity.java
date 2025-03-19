package com.campusmobil;

import android.app.Activity;
import android.content.Intent;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.VideoView;
import android.widget.RelativeLayout;

public class SplashActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Tam ekran modu (Navigation ve Status bar gizleme)
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
        );

        // VideoView oluştur
        VideoView videoView = new VideoView(this);

        // Tam ekran olacak şekilde ayarla
        RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT,
                RelativeLayout.LayoutParams.MATCH_PARENT
        );
        videoView.setLayoutParams(layoutParams);

        // Layout oluştur ve VideoView'i ekle
        RelativeLayout relativeLayout = new RelativeLayout(this);
        relativeLayout.addView(videoView);
        setContentView(relativeLayout);

        // Video dosyasının yolunu belirle
        String videoPath = "android.resource://" + getPackageName() + "/" + R.raw.androidsplash;
        Uri videoUri = Uri.parse(videoPath);

        videoView.setVideoURI(videoUri);
        videoView.setZOrderOnTop(true); // Üst katmanda oynat

        // Video tamamlandığında MainActivity'ye geç
        videoView.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mediaPlayer) {
                startActivity(new Intent(SplashActivity.this, MainActivity.class));
                finish();
            }
        });

        // Videoyu başlat
        videoView.start();
    }
}
