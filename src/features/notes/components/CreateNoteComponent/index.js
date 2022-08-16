import {Fragment, useEffect, useState} from "react";
import {Button, DatePicker, Form, Input, Radio, Space, Switch, Tag, TimePicker} from "antd";
import {breakTags} from "../../util/util";
import moment from "moment";

const CreateNoteComponent = (props) => {

    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const now = new Date();
    const [date, setDate] = useState(now);
    const [time, setTime] = useState(now);
    const [tags, setTags] = useState([]);
    const [location, setLocation] = useState("");
    const [flag, setFlag] = useState(false);
    const [priority, setPriority] = useState("medium");
    const [url, setUrl] = useState("");

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
    const onTitleChange = (event => {
        setTitle(state => {
            return event.target.value;
        });
    });

    const onNoteChange = (event => {
        setNote(state => {
            return event.target.value;
        });
    });

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

    const onLocationChange = (event => {
        setLocation(state => {
            return event.target.value;
        });
    });

    const onFlagChange = ((checked, event) => {
        setFlag(state => {
            return checked;
        });
    });


    const onUrlChange = (event) => {
        setUrl(state => {
            return event.target.value;
        })
    };

    const onSubmit = (event) => {
        const noteObject = {
            title, note, date, time, tags, location, flag, priority, url,
        }
        props.onSubmit(noteObject);
    }


    return <Fragment>
        <h1>Create Note</h1>

        <Form size="large" labelCol={{span: 2}} wrapperCol={{span: 20}}>

            <Form.Item name="title" label="Title">
                <Input onChange={onTitleChange}/>
            </Form.Item>

            <Form.Item name="note" label="Note">
                <Input onChange={onNoteChange}/>
            </Form.Item>

            <Form.Item name="date" label="Date" initialValue={moment(now)}>
                <DatePicker format={"DD/MM/YYYY"} onChange={onDateChange}/>
            </Form.Item>

            <Form.Item name="time" label="Time" initialValue={moment(new Date())}>
                <TimePicker format={"HH:mm"} onChange={onTimeChange}/>
            </Form.Item>

            <Form.Item name="tags" label="Tags">
                <Input onChange={onTagsChange}/>
            </Form.Item>

            <Form.Item label="Displayed Tags">
                <Space direction="horizontal" wrap={true} size="small">
                    {tags.map((item) => {
                        return <Tag color="blue" key={tags.indexOf(item)}>{item}</Tag>
                    })}
                </Space>
            </Form.Item>

            <Form.Item name="location" label="Location">
                <Input onChange={onLocationChange}/>
            </Form.Item>

            <Form.Item label="Flag">
                <Switch onChange={onFlagChange}/>
            </Form.Item>

            <Form.Item label="Priority">
                <Radio.Group options={priorityOptions} onChange={onPriorityChange} value={priority}
                             optionType="button"
                             buttonStyle="solid"/>
            </Form.Item>

            <Form.Item name="url" label="URL">
                <Input onChange={onUrlChange}/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" onClick={onSubmit}>Create</Button>
            </Form.Item>
        </Form>
    </Fragment>
};

export default CreateNoteComponent;