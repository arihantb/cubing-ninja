import Clipboard from '@react-native-clipboard/clipboard';
import DeviceInfo from 'react-native-device-info';
import React, {memo} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ToastAndroid, Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '_components';
import {strings} from '_data/strings';
import {useDoubleBackTapToExit} from '_hooks/useDoubleBackTapToExit';
import {togglePrivacyPolicyModalVisibility} from './redux/aboutSlice';
import PrivacyPolicyModal from './modals/PrivacyPolicyModal';
import {togglePrivacyPolicyModalVisibilityFromModal} from './redux/privacyPolicyModalSlice';

const About = () => {
  const isPrivacyPolicyModalVisible = useSelector(
    state => state.about.isPrivacyPolicyModalVisible,
  );

  const dispatch = useDispatch();

  const version = 1.0;

  const _copyToClipboard = async () => {
    const deviceInfo = {};

    try {
      deviceInfo.androidId = await DeviceInfo.getAndroidId();
      deviceInfo.apiLevel = await DeviceInfo.getApiLevel();
      deviceInfo.applicationName = DeviceInfo.getApplicationName();
      deviceInfo.baseOs = await DeviceInfo.getBaseOs();
      deviceInfo.buildId = await DeviceInfo.getBuildId();
      deviceInfo.batteryLevel = await DeviceInfo.getBatteryLevel();
      deviceInfo.bootloader = await DeviceInfo.getBootloader();
      deviceInfo.brand = DeviceInfo.getBrand();
      deviceInfo.buildNumber = DeviceInfo.getBuildNumber();
      deviceInfo.bundleId = DeviceInfo.getBundleId();
      deviceInfo.carrier = await DeviceInfo.getCarrier();
      deviceInfo.codename = await DeviceInfo.getCodename();
      deviceInfo.device = await DeviceInfo.getDevice();
      deviceInfo.deviceId = DeviceInfo.getDeviceId();
      deviceInfo.deviceType = DeviceInfo.getDeviceType();
      deviceInfo.display = await DeviceInfo.getDisplay();
      deviceInfo.deviceName = await DeviceInfo.getDeviceName();
      deviceInfo.deviceToken = await DeviceInfo.getDeviceToken();
      deviceInfo.firstInstallTime = await DeviceInfo.getFirstInstallTime();
      deviceInfo.fontScale = await DeviceInfo.getFontScale();
      deviceInfo.freeDiskStorage = await DeviceInfo.getFreeDiskStorage();
      deviceInfo.freeDiskStorageOld = await DeviceInfo.getFreeDiskStorageOld();
      deviceInfo.hardware = await DeviceInfo.getHardware();
      deviceInfo.host = await DeviceInfo.getHost();
      deviceInfo.ipAddress = await DeviceInfo.getIpAddress();
      deviceInfo.incremental = await DeviceInfo.getIncremental();
      deviceInfo.installerPackageName =
        await DeviceInfo.getInstallerPackageName();
      deviceInfo.installReferrer = await DeviceInfo.getInstallReferrer();
      deviceInfo.instanceId = await DeviceInfo.getInstanceId();
      deviceInfo.lastUpdateTime = await DeviceInfo.getLastUpdateTime();
      deviceInfo.macAddress = await DeviceInfo.getMacAddress();
      deviceInfo.manufacturer = await DeviceInfo.getManufacturer();
      deviceInfo.maxMemory = await DeviceInfo.getMaxMemory();
      deviceInfo.model = DeviceInfo.getModel();
      deviceInfo.phoneNumber = await DeviceInfo.getPhoneNumber();
      deviceInfo.powerState = await DeviceInfo.getPowerState();
      deviceInfo.product = await DeviceInfo.getProduct();
      deviceInfo.previewSdkInt = await DeviceInfo.getPreviewSdkInt();
      deviceInfo.readableVersion = DeviceInfo.getReadableVersion();
      deviceInfo.serialNumber = await DeviceInfo.getSerialNumber();
      deviceInfo.securityPatch = await DeviceInfo.getSecurityPatch();
      deviceInfo.systemAvailableFeatures =
        await DeviceInfo.getSystemAvailableFeatures();
      deviceInfo.systemName = DeviceInfo.getSystemName();
      deviceInfo.systemVersion = DeviceInfo.getSystemVersion();
      deviceInfo.tags = await DeviceInfo.getTags();
      deviceInfo.type = await DeviceInfo.getType();
      deviceInfo.totalDiskCapacity = await DeviceInfo.getTotalDiskCapacity();
      deviceInfo.totalDiskCapacityOld =
        await DeviceInfo.getTotalDiskCapacityOld();
      deviceInfo.totalMemory = await DeviceInfo.getTotalMemory();
      deviceInfo.uniqueId = DeviceInfo.getUniqueId();
      deviceInfo.usedMemory = await DeviceInfo.getUsedMemory();
      deviceInfo.userAgent = await DeviceInfo.getUserAgent();
      deviceInfo.version = DeviceInfo.getVersion();
      deviceInfo.gms = await DeviceInfo.hasGms();
      deviceInfo.hms = await DeviceInfo.hasHms();
      deviceInfo.notch = DeviceInfo.hasNotch();
      deviceInfo.systemFeature = await DeviceInfo.hasSystemFeature();
      deviceInfo.airplaneMode = await DeviceInfo.isAirplaneMode();
      deviceInfo.batteryCharging = await DeviceInfo.isBatteryCharging();
      deviceInfo.emulator = await DeviceInfo.isEmulator();
      deviceInfo.landscape = await DeviceInfo.isLandscape();
      deviceInfo.locationEnabled = await DeviceInfo.isLocationEnabled();
      deviceInfo.headphonesConnected = await DeviceInfo.isHeadphonesConnected();
      deviceInfo.tablet = DeviceInfo.isTablet();
      deviceInfo.supported32BitAbis = await DeviceInfo.supported32BitAbis();
      deviceInfo.supported64BitAbis = await DeviceInfo.supported64BitAbis();
      deviceInfo.supportedAbis = await DeviceInfo.supportedAbis();
      deviceInfo.syncUniqueId = await DeviceInfo.syncUniqueId();
    } catch (error) {
      console.error(error);
    }

    Clipboard.setString(JSON.stringify(deviceInfo));
  };

  const _checkVersion = () => {
    if (version === 1.0) {
      ToastAndroid.show(strings.versionCheckToastLatest, ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(strings.versionCheckToastUpdate, ToastAndroid.SHORT);
    }
  };

  useDoubleBackTapToExit();

  return (
    <SafeAreaProvider>
      {isPrivacyPolicyModalVisible && <PrivacyPolicyModal />}
      <View className="flex-1 p-6 pl-12 gap-10 bg-neutral-50 dark:bg-neutral-800">
        <Pressable
          onPress={() => {
            ToastAndroid.show(
              strings.deviceInfoCopiedToast,
              ToastAndroid.SHORT,
            );
            _copyToClipboard();
          }}>
          <Text className="mb-2 text-lg">{strings.copyDeviceInfoTitle}</Text>
          <Text>{strings.copyDeviceInfoSubtitle}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            dispatch(togglePrivacyPolicyModalVisibility());
            dispatch(togglePrivacyPolicyModalVisibilityFromModal());
          }}>
          <Text className="mb-2 text-lg">{strings.privacyPolicyTitle}</Text>
        </Pressable>
        <Pressable onPress={() => _checkVersion()}>
          <Text className="mb-2 text-lg">
            {strings.versionCheckTitle} {version.toPrecision(1)}
          </Text>
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
};

export default memo(About);
