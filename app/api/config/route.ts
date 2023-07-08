import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { IConfig } from './type';
import { Res, ErrorCode } from '../type';

export async function GET(
  request: NextRequest,
  context: any
): Promise<NextResponse<Res<IConfig[]>>> {
  console.log('config req', request, context);

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const configPath = path.resolve(`../fvm_manage/config/${id}.json`);

    const configJsonStr = fs.readFileSync(configPath).toString();

    const config = JSON.parse(configJsonStr || '{}') as IConfig[];

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
