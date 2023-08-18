#import "RNMLYDriver.h"
#import <React/RCTLog.h>

@import MLYSDK;

@implementation RNMLYDriver

RCT_EXPORT_MODULE(MlyDriver);
 
RCT_REMAP_METHOD(init, result: (NSDictionary *)result resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    RCTLogInfo(@"init options:%@", result);
   
    NSError *error = nil;
    [MLYDriver initializeAndReturnError:&error :^(MLYDriverOptions *options) {
        NSString *clientID = result[@"clientId"];
        NSString *server = result[@"server"];
        BOOL debug = [result[@"debug"] boolValue];
      
        [[options client] setId:clientID];
        if( server != nil) {
          [[[options server] host] setFqdn:server];
        }
        [options setDebug:debug];
    }];
  
    if (error) {
        reject(@"MLYSDK init error", error.description, error);
    } else {
        resolve(@"MLYSDK init success");
    }
}

@end
