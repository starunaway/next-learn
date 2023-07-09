import { Modal } from 'antd';
import { IConfig } from '../api/config/type';
import { Form, Input, Button } from 'antd';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

interface IProps {
  visible: boolean;
  data: IConfig | null;

  onOK: (value: IConfig) => void;
  onCancel: () => void;
}

export default (props: IProps) => {
  const { visible, data, onCancel, onOK } = props;

  const [form] = Form.useForm();
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data!);
    }
  }, [data, visible]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOK(values);
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal title="编辑" destroyOnClose open={visible} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form}>
        <Form.Item label="name" name="name" rules={[{ required: true, message: 'name' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="detail" name="detail" rules={[{ required: true, message: 'detail' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="logo" name="logo" rules={[{ required: true, message: 'logo' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="links" name="links">
          <Form.List name="links" key={'links'}>
            {(links, { add, remove }) => {
              return (
                <>
                  {links.map((link) => (
                    <div key={link.key} className="flex">
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.area !== curValues.area ||
                          prevValues.sights !== curValues.sights
                        }
                      >
                        {() => (
                          <Form.Item
                            // antd 会有个props key 报错...
                            // {...link}
                            label="href"
                            name={[link.name, 'href']}
                            rules={[{ required: true, message: 'Missing sight' }]}
                          >
                            <Input></Input>
                          </Form.Item>
                        )}
                      </Form.Item>
                      <Form.Item
                        // {...link}
                        label="icon"
                        name={[link.name, 'icon']}
                        rules={[{ required: true, message: 'Missing price' }]}
                      >
                        <Input />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(link.name)} />
                    </div>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Links
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        </Form.Item>
      </Form>
    </Modal>
  );
};
