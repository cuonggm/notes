import { Form, Input, Button} from "antd";

const CreateList = (props) => {

    const listNameProp = props.listNameProp;

    const [form] = Form.useForm();

    const onNameChange = (event) => {
        listNameProp.setListName(state => {
            return event.target.value;
        })
    }

    const onSubmit = (event) => {
        props.onSubmit();
    }

    return (
        <div>
            <h1>Create List</h1>
            <div>
                <Form
                    form={form}
                    layout="horizontal"
                    labelCol={{span: 4}}
                    wrapperCol={{span: 20}}
                >
                    <Form.Item
                        initialValue={listNameProp.listName}
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

                    <Form.Item wrapperCol={{offset: 4, span: 20}}>
                        <Button type="primary" onClick={onSubmit}>
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CreateList;
