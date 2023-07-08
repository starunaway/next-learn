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

      <div className="p-3 flex flex-wrap gap-1 content-baseline">
        {items.map((item) => {
          return (
            <div key={item.name} className="w-40  h-12">
              <div>
                <img src={item.logo} alt="" />
              </div>
              <div>
                <div>{item.name}</div>
                <div>
                  <div>{item.detail}</div>
                  <div>
                    {(item.links || []).map((link) => {
                      return (
                        <a href={link.href} key={link.href}>
                          <img src={link.href} alt="" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
