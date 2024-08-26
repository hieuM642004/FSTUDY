import { combineReducers } from '@reduxjs/toolkit';
import recordingReducer from '../features/recording/recordingSlice';

const rootReducer = combineReducers({
    recording: recordingReducer,
    
});

export default rootReducer;
