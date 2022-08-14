import {Fragment, useState} from "react";
import {Button, DatePicker, Form, Input, Radio, Switch, Tag, TimePicker} from "antd";
import {breakTags} from "../util/util";

const CreateNoteComponent = (props) => {
    const [tags, setTags] = useState([]);
    const [priority, setPriority] = useState("medium")

    const onTagsChange = (event) => {
        let tagList = breakTags(event.target.value);
        setTags(state => {
            return tagList;
        });
    }

    const priorityOptions = [
        {
            label: "Low",
            value: "low"
        },
        {
            label: "Medium",
            value: "medium"
        },
        {
            label: "High",
            value: "high"
        },
    ];

    const onPriorityChange = ({target: {value}}) => {
        setPriority(value);
    };

    return <Fragment>
        <h1>Create Note</h1>
        <Form size="large" labelCol={{span: 2}} wrapperCol={{span: 20}}>

            <Form.Item name="title" label="Title">
                <Input/>
            </Form.Item>

            <Form.Item name="note" label="Note">
                <Input/>
            </Form.Item>

            <Form.Item name="date" label="Date">
                <DatePicker format={"DD/MM/YYYY"}/>
            </Form.Item>

            <Form.Item name="time" label="Time">
                <TimePicker format={"HH:mm"}/>
            </Form.Item>

            <Form.Item name="tags" label="Tags">
                <Input onChange={onTagsChange}/>
            </Form.Item>

            <Form.Item label="Displayed Tags">
                {tags.map((item) => {
                    return <Tag color="blue" key={tags.indexOf(item)}>{item}</Tag>
                })}
            </Form.Item>

            <Form.Item name="location" label="Location">
                <Input/>
            </Form.Item>

            <Form.Item label="Flag">
                <Switch/>
            </Form.Item>

            <Form.Item label="Priority">
                <Radio.Group options={priorityOptions} onChange={onPriorityChange} value={priority} optionType="button"
                             buttonStyle="solid"/>
            </Form.Item>

            <Form.Item name="url" label="URL">
                <Input/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 2, span: 22}}>
                <Button type="primary">Create</Button>
            </Form.Item>

        </Form>
    </Fragment>
};

export default CreateNoteComponent;