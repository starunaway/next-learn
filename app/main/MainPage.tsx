'use client';
import {
  classnames,
  spacing,
  sizing,
  typography,
  backgroundColor,
  borders,
  interactivity,
} from 'tailwindcss-classnames';
import { useState } from 'react';
import { IConfig } from '../api/config/type';
import { IMainData } from './type';
import Config from './Config';

interface Props {
  data: IMainData[];
  defaultConfig: IConfig[];
}

export default (props: Props) => {
  const { data, defaultConfig } = props;

  const [items, setItems] = useState(defaultConfig);

  const [active, setActive] = useState(data[0]);

  const handleSelectConfig = async (item: IMainData) => {
    const res = await fetch(`http://localhost:3000/api/config?id=${item.label}`);

    const data = await res.json();

    setItems(data.data);
    setActive(item);
  };

  const handleSaveConfig = async (config: IConfig, index: number) => {
    console.log(config, index, items);

    const newConfig = [...items];
    newConfig[index] = config;

    const res = await fetch(`http://localhost:3000/api/config?id=${active.label}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(newConfig), // body data type must match "Content-Type" header
    });

    setItems(newConfig);
  };

  return (
    <>
      <div className="w-[200px] min-w-[200px] border-r border-slate-950 p-2">
        {data.map((item) => {
          return (
            <div
              className={classnames(
                spacing('my-1', 'pl-3'),
                borders('rounded-sm'),
                interactivity('cursor-pointer'),
                backgroundColor(
                  'hover:bg-stone-200',
                  active.label === item.label ? 'bg-stone-400' : undefined
                )
              )}
              key={item.label}
              onClick={() => handleSelectConfig(item)}
            >
              {item.label}
            </div>
          );
        })}
      </div>

      <div className="p-3 flex flex-wrap gap-2 content-baseline">
        <Config items={items} onSaveConfig={handleSaveConfig}></Config>
      </div>
    </>
  );
};
