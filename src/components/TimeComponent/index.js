import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {timeActions} from "./timeSlice";

const TimeComponent = (props) => {

    // Slice
    const dispatch = useDispatch();
    const timeSlice = useSelector(state => state.timeSlice);

    useEffect(() => {
        let intervalId = null;
        if (timeSlice.isRunning) {
            intervalId = setInterval(() => {
                dispatch(timeActions.decreaseOne());
            }, 1000);
        }

        return () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        }
    }, [timeSlice.isRunning, dispatch]);

    return <Fragment>
        {timeSlice.isRunning && <div>{timeSlice.timeRemain} s</div>}
    </Fragment>
}

export default TimeComponent;