import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export type StatusType = "idle" | "fulfilled" | "pending" | "rejected";

export type CounterState = {
  value: number;
  status: StatusType;
  errMessage: undefined | string;
};

const initialState: CounterState = {
  value: 0,
  status: "idle",
  errMessage: undefined,
};

export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount: number): Promise<number> => {
    if (amount > 100) {
      throw Error("Amount too large!");
    }
    return new Promise((res) => {
      setTimeout(() => {
        res(amount);
      }, 800);
    });
  },
);

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number | undefined>) => {
      if (action?.payload !== undefined) {
        state.value = state.value + action.payload;
      } else {
        state.value += 1;
      }
    },
    decrement: (state, action: PayloadAction<number | undefined>) => {
      if (action?.payload !== undefined) {
        state.value -= action.payload;
      } else {
        state.value -= 1;
      }
    },
    reset: () => {
      return initialState;
    },
    incrementIfOdd: (state, action: PayloadAction<number>) => {
      if (state.value % 2 !== 0) {
        state.value += action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "pending";
        state.errMessage = undefined;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.value += action?.payload;
        state.status = "fulfilled";
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errMessage = action.error.message;
      });
  },
});

export const { increment, decrement, reset, incrementIfOdd } =
  counterSlice.actions;
export default counterSlice.reducer;
