#import "RNMLYDriver.h"
#import <React/RCTLog.h>

@import MLYSDK;

@implementation RNMLYDriver

RCT_EXPORT_MODULE(MLYDriver);


RCT_REMAP_METHOD(initializeWithServer, clientID: (NSString *)clientID server:(NSString *)server debug:(BOOL)debug resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  
    RCTLogInfo(@"initialize clientID:%@ server:%@ debug: %d", clientID, server, debug);
  
    NSDictionary *result = [[NSDictionary alloc]init];
    NSError *error = nil;
    [MLYDriver initializeAndReturnError: &error :^(MLYDriverOptions * options) {
      [[options client] setId:clientID];
      if( server != nil) {
        [[[options server] host] setFqdn:server];
      }
      [options setDebug: debug];
    }];
  
  if (error) {
    reject(@"MLYSDK initialize error", error.description, error);
  } else {
    resolve(result);
  }
}

RCT_REMAP_METHOD(initialize, clientID: (NSString *)clientID resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  
    RCTLogInfo(@"initialize clientID:%@", clientID);
  
    NSDictionary *result = [[NSDictionary alloc]init];
    NSError *error = nil;
    [MLYDriver initializeAndReturnError: &error :^(MLYDriverOptions * options) {
      [[options client] setId:clientID];
    }];
  
  if (error) {
    reject(@"MLYSDK initialize error", error.description, error);
  } else {
    resolve(result);
  }
}

@end
