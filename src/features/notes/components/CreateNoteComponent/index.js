import {Fragment, useState} from "react";
import {Button, DatePicker, Form, Input, Radio, Switch, Tag, TimePicker} from "antd";
import {breakTags} from "../../util/util";
import {
    getDateFromMoment, getTimeFromMoment, toDate,
} from "../../../../util/datetime";
import moment from "moment";

const CreateNoteComponent = (props) => {

    // For getting Input values
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const now = new Date();
    const [date, setDate] = useState(now);
    const [time, setTime] = useState(now);
    const [tags, setTags] = useState([]);
    const [priority, setPriority] = useState("medium")

    // Initial Input Values

    const priorityOptions = [{
        label: "Low", value: "low"
    }, {
        label: "Medium", value: "medium"
    }, {
        label: "High", value: "high"
    },];

    const onPriorityChange = ({target: {value}}) => {
        setPriority(value);
    };

    // Event Handlers

    // Datepicker
    const onDateChange = (date, dateString) => {
        if (date === null) {
            return;
        }
        setDate(state => {
            return date.toDate();
        })
    }

    // Timepicker
    const onTimeChange = (time, timeString) => {
        if (time === null) {
            return;
        }
        setTime(state => {
            return time.toDate();
        })
    }

    // Tags
    const onTagsChange = (event) => {
        let tagList = breakTags(event.target.value);
        setTags(state => {
            return tagList;
        });
    }

    // Submit Button Clicked
    const onSubmit = (event) => {
        const timestamp = toDate(date, time).getTime();
        console.log(timestamp);
    }

    return <Fragment>
        <h1>CreateNoteComponent</h1>
        <Form size="large" labelCol={{span: 2}} wrapperCol={{span: 20}}>

            <Form.Item name="title" label="Title">
                <Input/>
            </Form.Item>

            <Form.Item name="note" label="Note">
                <Input/>
            </Form.Item>

            <Form.Item name="date" label="Date" initialValue={moment(now)}>
                <DatePicker format={"DD/MM/YYYY"} onChange={moment(now)}/>
            </Form.Item>

            <Form.Item name="time" label="Time" initialValue={moment(new Date())}>
                <TimePicker format={"HH:mm"} onChange={onTimeChange}/>
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
                <Button type="primary" onClick={onSubmit}>Create</Button>
            </Form.Item>

        </Form>
    </Fragment>
};

export default CreateNoteComponent;