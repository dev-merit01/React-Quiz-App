import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  reload,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

// -------------------------
// Async Thunks
// -------------------------

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // Reload user to get latest emailVerified status
      await reload(userCred.user);

      if (!userCred.user.emailVerified) {
        throw new Error("Email not verified. Please check your inbox.");
      }

      return {
        uid: userCred.user.uid,
        email: userCred.user.email,
        emailVerified: userCred.user.emailVerified,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      // Validate inputs
      if (!email || !password || !username) {
        return rejectWithValue("Please provide email, password, and username");
      }

      if (password.length < 6) {
        return rejectWithValue("Password must be at least 6 characters");
      }

      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // Send email verification first
      try {
        await sendEmailVerification(userCred.user);
      } catch (emailError) {
        console.error("Email verification error:", emailError);
        // Continue even if email verification fails
      }

      // Save username in Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        username: username,
        email: email,
        createdAt: new Date(),
      });

      return {
        uid: userCred.user.uid,
        email: userCred.user.email,
        emailVerified: userCred.user.emailVerified,
        registrationComplete: true,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Persist Google user info to Firestore (merge so we don't overwrite existing fields)
      try {
        await setDoc(
          doc(db, "users", result.user.uid),
          {
            username: result.user.displayName || "",
            email: result.user.email,
            createdAt: new Date(),
          },
          { merge: true }
        );
      } catch (saveErr) {
        console.error("Failed to save Google user to Firestore:", saveErr);
      }

      if (!result.user.emailVerified) {
        throw new Error("Email not verified. Please check your inbox.");
      }

      return {
        uid: result.user.uid,
        email: result.user.email,
        emailVerified: result.user.emailVerified,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Resend email verification: sign in the user (so we have a user object),
// send verification email, then sign out again so they can't access protected pages.
export const sendVerificationEmail = createAsyncThunk(
  "auth/sendVerificationEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // send the verification
      await sendEmailVerification(userCred.user);

      // sign out to prevent access before verification
      await signOut(auth);

      return "Verification email sent";
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
  return null;
});

// -------------------------
// Slice
// -------------------------
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(loginUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(loginWithGoogle.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
      })
      .addCase(loginWithGoogle.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(logoutUser.fulfilled, (s) => {
        s.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
