import { Row, Col, Form, Input, Button } from "antd";

const CreateList = (props) => {
  const onListNameChange = (event) => {
    props.setListName(event.target.value);
  };
  return (
    <Row>
      <Col style={{ width: "100%" }}>
        <h1>Create List</h1>
        <div>
          <Form
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Form.Item
              label="List name"
              name="listName"
              rules={[
                {
                  required: true,
                  message: "Please input your List name.",
                },
              ]}
            >
              <Input onChange={onListNameChange} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
              <Button type="primary" onClick={props.onCreateListButtonClick}>
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default CreateList;
