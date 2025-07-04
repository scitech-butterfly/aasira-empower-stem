
-- Add end_date column to events table to support date ranges
ALTER TABLE public.events 
ADD COLUMN end_date date;

-- Update the date column to be more clearly named as start_date for clarity
-- We'll keep the existing 'date' column as start_date for backward compatibility
