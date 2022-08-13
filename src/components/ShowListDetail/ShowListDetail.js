import {Fragment, useState} from "react";
import {Button, Form, Input, Spin} from "antd";

const ShowListDetail = (props) => {

    const word = props.word;
    console.log("child component:");
    console.log(word);
    const setWord = props.setWord;

    const [createLoading, setCreateLoading] = useState(false);

    const onContentChange = (event) => {
        setWord(state => {
            return {
                ...state,
                content: event.target.value
            }
        })
    }

    const onHiraganaChange = (event) => {
        setWord(state => {
            return {
                ...state,
                hiragana: event.target.value
            }
        })
    }

    const onImiChange = (event) => {
        setWord(state => {
            return {
                ...state,
                imi: event.target.value
            }
        })
    }

    const onKanjiChange = (event) => {
        setWord(state => {
            return {
                ...state,
                kanji: event.target.value
            }
        })
    }

    const onSubmit = async (event) => {
        setCreateLoading(true);
        const data = await props.onCreateWord();
        console.log(data);
        setCreateLoading(false);
        form.resetFields();
    }

    const [form] = Form.useForm();
    return <Fragment>
        <div>
            <h1>ShowListDetail</h1>
            <div>List ID: {props.listId}</div>
            <div>List Name: {props.listName}</div>
            <div>User ID: {props.userId}</div>
        </div>
        <div>
            <h1>Create word</h1>
            <Spin spinning={createLoading}>
                <Form form={form} labelCol={{span: 4}} wrapperCol={{span: 20}}>
                    <Form.Item name="content" label="Word" initialValue="">
                        <Input onChange={onContentChange}/>
                    </Form.Item>

                    <Form.Item name="hiragara" label="Hiragana" initialValue="">
                        <Input onChange={onHiraganaChange}></Input>
                    </Form.Item>

                    <Form.Item name="imi" label="Meaning" initialValue="">
                        <Input onChange={onImiChange}/>
                    </Form.Item>

                    <Form.Item name="kanji" label="Kanji" initialValue="">
                        <Input onChange={onKanjiChange}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 4, span: 20}}>
                        <Button type="primary" onClick={onSubmit}>Create Word</Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    </Fragment>
}

export default ShowListDetail;