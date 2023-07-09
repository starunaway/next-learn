import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { IConfig } from './type';
import { Res, ErrorCode } from '../type';

const getConfigPath = (name: string) => {
  return path.resolve(`./public/fvm_manage/config/${name}.json`);
};

export async function getConfigByName(name: string): Promise<IConfig[]> {
  const configPath = getConfigPath(name);
  const configJsonStr = fs.readFileSync(configPath).toString();
  const config = JSON.parse(configJsonStr || '{}') as IConfig[];

  return config;
}

export async function GET(
  request: NextRequest,
  context: any
): Promise<NextResponse<Res<IConfig[]>>> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const config = await getConfigByName(id || '');

    return NextResponse.json({
      code: ErrorCode.Success,
      message: 'success',
      data: config,
    });
  } catch (error) {
    return NextResponse.json({
      code: ErrorCode.ServerError,
      message: error as string,
      data: [],
    });
  }
}

export async function POST(request: NextRequest, context: any, ...args: any[]) {
  const reader = request.body?.getReader();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  let bodyStr: string = '';

  try {
    if (reader) {
      while (true) {
        const { done, value } = await reader?.read();
        if (done) break;

        value.forEach((i) => {
          const char = String.fromCharCode(i);
          bodyStr += char;
        });
      }
    }

    const bodyJson = JSON.parse(bodyStr);

    const configPath = getConfigPath(id || '');

    fs.writeFileSync(configPath, JSON.stringify(bodyJson, undefined, ' '));

    console.log(bodyJson);

    return NextResponse.json({
      code: ErrorCode.Success,
      message: 'success',
      data: null,
    });
  } catch (error) {
    console.error('Update Config error', error);
    return NextResponse.json({
      code: ErrorCode.ServerError,
      message: error,
      data: null,
    });
  }
}
