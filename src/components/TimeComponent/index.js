import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {timeActions} from "./timeSlice";
import {diffMins} from "../../util/datetime";

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
        {timeSlice.isRunning && <div>{diffMins(timeSlice.timeRemain).toFixed(0)} mins</div>}
    </Fragment>
}

export default TimeComponent;