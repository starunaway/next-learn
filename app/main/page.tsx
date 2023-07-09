import fs from 'fs';
import path from 'path';
import MainPage from './MainPage';
import { IMainData } from './type';
import { IConfig } from '../api/config/type';
import { Res } from '../api/type';
import { getConfigByName } from '../api/config/route';

async function getMain(): Promise<IMainData[]> {
  try {
    const mainJsonPath = path.resolve('../fvm_manage/main.json');
    const mainJsonStr = fs.readFileSync(mainJsonPath).toString();

    return JSON.parse(mainJsonStr) as IMainData[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getConfig(id: string): Promise<IConfig[]> {
  try {
    const res = await getConfigByName(id || '');

    return res;
  } catch (error) {
    return [];
  }
}

export default async () => {
  const mainData = await getMain();

  const defaultConfig = await getConfig(mainData[0].label || '');

  return (
    <div className="h-full flex">
      <MainPage data={mainData} defaultConfig={defaultConfig}></MainPage>
    </div>
  );
};
