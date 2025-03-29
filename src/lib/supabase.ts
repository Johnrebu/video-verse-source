
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ulmoiotecdqflqukzubk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbW9pb3RlY2RxZmxxdWt6dWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNjkzNDQsImV4cCI6MjA1ODg0NTM0NH0.4FgVt6J75q4UvdlUR3VWAAE-mfL6P_cWrg53lU8HElc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
