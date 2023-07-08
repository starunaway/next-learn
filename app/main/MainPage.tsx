'use client';

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

  const handleSelectConfig = async (item: IMainData) => {
    const res = await fetch(`http://localhost:3000/api/config?id=${item.label}`);

    const data = await res.json();
    console.log('sdgsdg', data);

    setItems(data.data);
  };

  return (
    <>
      <div className="w-[200px] border-r border-slate-950">
        {data.map((item) => {
          return (
            <div key={item.label} onClick={() => handleSelectConfig(item)}>
              {item.label}
            </div>
          );
        })}
      </div>

      <div>
        {items.map((item) => {
          return (
            <div key={item.name}>
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
