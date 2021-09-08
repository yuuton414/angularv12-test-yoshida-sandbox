import { Component, OnInit } from '@angular/core';
import { AppConfigurationClient } from '@azure/app-configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-test';

  featureFlag = this.getFeatureFlag();

  applicationSettingConfig = '';

  ngOnInit(): void {
    this.getApplicationSettingConfig();
  }

  async getFeatureFlag() {
    // 接続文字列
    const conn = '接続文字列'; 
    const client = new AppConfigurationClient(conn);

    const val = await client.getConfigurationSetting({ key: '.appconfig.featureflag/FeatureShowText' });
    return JSON.parse(val.value === undefined ? '' : val.value).enabled;
  }

  async getApplicationSettingConfig(): Promise<void> {
    // 接続文字列
    const conn = '接続文字列'; 
    const client = new AppConfigurationClient(conn);
    const val = await client.getConfigurationSetting({ key: 'ApplicationTestConfig' });
    console.log(val);
    this.applicationSettingConfig = val.value === undefined ? '' : val.value;
  }

}
