import fs from 'fs';
import path from 'path';
import MainPage from './MainPage';
import { IMainData } from './type';
import { IConfig } from '../api/config/type';
import { Res } from '../api/type';

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

async function getConfig(id: string): Promise<Res<IConfig[]>> {
  try {
    const res = await fetch(`http://localhost:3000/api/config?id=${id}`);

    return await res.json();
  } catch (error) {
    return {
      code: -1,
      message: '网络请求失败',
      data: [],
    };
  }
}

export default async () => {
  const mainData = await getMain();

  const defaultConfig = await getConfig(mainData[0].label || '');

  return (
    <div className="h-full flex">
      <MainPage data={mainData} defaultConfig={defaultConfig.data}></MainPage>
    </div>
  );
};
