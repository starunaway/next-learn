import { useState } from 'react';
import { IConfig } from '../api/config/type';
import ConfigModal from './ConfigModal';

interface IProps {
  items: IConfig[];
  onSaveConfig: (config: IConfig, index: number) => void;
}

export default (props: IProps) => {
  const { items, onSaveConfig } = props;

  const [modalParams, setModalParams] = useState<{
    visible: boolean;
    data: IConfig | null;
    index?: number;
  }>({
    visible: false,
    data: null,
  });

  const handleConfigOK = (config: IConfig) => {
    if (typeof modalParams.index === 'number') {
      onSaveConfig(config, modalParams.index);
    }

    setModalParams({
      visible: false,
      data: null,
    });
  };

  const handleConfigCancel = () => {
    setModalParams({
      visible: false,
      data: null,
    });
  };

  return (
    <>
      {items.map((item, index) => {
        return (
          <div
            key={item.name}
            onClick={() => {
              setModalParams({
                visible: true,
                data: item,
                index,
              });
            }}
            className="w-80  h-20 rounded-sm border border-black flex"
          >
            <div className="w-20">
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
                        <img src={link.icon} alt="" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <ConfigModal
        {...modalParams}
        onOK={handleConfigOK}
        onCancel={handleConfigCancel}
      ></ConfigModal>
    </>
  );
};
