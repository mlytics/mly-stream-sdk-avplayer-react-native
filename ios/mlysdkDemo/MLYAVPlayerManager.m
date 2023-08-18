 
#import "MLYAVPlayerManager.h"
#import <React/RCTViewManager.h>
#import <AVKit/AVKit.h>
#import <React/RCTLog.h>
@import MLYAVPlayer;

@implementation MLYAVPlayerManager

RCT_EXPORT_MODULE(RCTMlyPlayer)

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
  BOOL tmp = [json boolValue];
  if (tmp) {
    [manager autoplay: [json boolValue]];
  }else{
    [manager pause];
  }
}

RCT_CUSTOM_VIEW_PROPERTY(muted, BOOL, UIView){
  [manager muted: [json boolValue]];
}

RCT_EXPORT_METHOD(play) {
  [manager play];
}

RCT_EXPORT_METHOD(playWith:(NSString *)src) {
  [manager playWithSrc:src];
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

RCT_EXPORT_METHOD(setLatency:(double)latency) {
  [manager setLatency:latency];
}
 
RCT_CUSTOM_VIEW_PROPERTY(isMonitorAllowed, BOOL, UIView){
  [manager isMonitorAllowed: [json boolValue]];
}

RCT_CUSTOM_VIEW_PROPERTY(isLoaderAllowed, BOOL, UIView){
  [manager isLoaderAllowed: [json boolValue]];
}

@end
