import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = 'https://bokwauchugfpdvgtkrnl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJva3dhdWNodWdmcGR2Z3Rrcm5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMjA5NjAsImV4cCI6MjA4MDc5Njk2MH0.THEXXVJKi0obzRI6TXLpAHXq1sW6Ad_cLqp_fbdIprM';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
