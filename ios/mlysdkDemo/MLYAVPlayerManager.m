 
#import "MLYAVPlayerManager.h"
#import <React/RCTViewManager.h>
#import <AVKit/AVKit.h>
#import <React/RCTLog.h>
@import MLYSDK;

@implementation MLYAVPlayerManager

RCT_EXPORT_MODULE(MLYPlayer)

MLYPlayerManger *manager;

- (UIView *)view
{
  if(manager == nil) {
    manager = [[MLYPlayerManger alloc] init];
  }
  return [manager view];
}

RCT_CUSTOM_VIEW_PROPERTY(src, NSString, UIView) {
  [manager src: json];
}

RCT_CUSTOM_VIEW_PROPERTY(controls, BOOL, UIView){
  [manager controls: [json boolValue]];
}

RCT_CUSTOM_VIEW_PROPERTY(autoplay, BOOL, UIView){
  [manager autoplay: [json boolValue]];
}

RCT_CUSTOM_VIEW_PROPERTY(muted, BOOL, UIView){
  [manager muted: [json boolValue]];
}

RCT_EXPORT_METHOD(play) {
[manager play];
}

RCT_EXPORT_METHOD(playWith:(NSString *)src) {
  [manager playWith:src];
}

RCT_EXPORT_METHOD(pause) {
  [manager pause];
}

RCT_EXPORT_METHOD(stop) {
  [manager stop];
}

RCT_EXPORT_METHOD(changeControls:(BOOL)y) {
  [manager controls:y];
}

RCT_EXPORT_METHOD(changeMuted:(BOOL)y) {
  [manager muted:y];
}

RCT_EXPORT_METHOD(changeAutoplay:(BOOL)y) {
  [manager autoplay:y];
}


@end
