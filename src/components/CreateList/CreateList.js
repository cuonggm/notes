import {Form, Input, Button, Spin} from "antd";
import {useState} from "react";

const CreateList = (props) => {

    const listNameProp = props.listNameProp;

    const [isLoading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onNameChange = (event) => {
        listNameProp.setListName(state => {
            return event.target.value;
        })
    }

    const onSubmit = async (event) => {
        setLoading(true);
        const data = await props.onSubmit();
        console.log(data);
        setLoading(false);
        form.resetFields();
    }

    return (
        <div>
            <h1>Create List</h1>
            <div>
                <Spin spinning={isLoading}>
                    <Form
                        form={form}
                        layout="horizontal"
                        labelCol={{span: 4}}
                        wrapperCol={{span: 20}}
                    >
                        <Form.Item
                            initialValue=""
                            label="List name"
                            name="listName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your List name.",
                                },
                            ]}
                        >
                            <Input onChange={onNameChange}/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" onClick={onSubmit}>
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        </div>
    );
};

export default CreateList;
