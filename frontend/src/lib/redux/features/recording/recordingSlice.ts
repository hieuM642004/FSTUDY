import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecordingState {
    valueSelections: Record<string, string | number | null>;
}

const initialState: RecordingState = {
    valueSelections: {},
};

const recordingSlice = createSlice({
    name: 'recording',
    initialState,
    reducers: {
        updateSelection(state, action: PayloadAction<{ questionId: string; value: string | number | null }>) {
            state.valueSelections[action.payload.questionId] = action.payload.value;
        },
    },
});

export const { updateSelection } = recordingSlice.actions;
export default recordingSlice.reducer;
