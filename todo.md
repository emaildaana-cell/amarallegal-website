# Amaral Law - Project TODO

## Bond Questionnaire & Database
- [x] Upgrade project to full-stack (web-db-user)
- [x] Create comprehensive BondSubmission database schema
- [x] Implement tRPC procedures for bond submission
- [x] Rewrite Bond Questionnaire form with comprehensive fields
- [x] Add multilingual support (EN, ES, PT)
- [x] Add vitest tests for bond submission API

## Admin Dashboard
- [ ] Create admin dashboard layout and protected route
- [ ] Build data table with all bond submissions
- [ ] Add filtering by status, date range, detainee name
- [ ] Add sorting by date, status, detainee name
- [ ] Implement quick-view modal for submission details
- [ ] Add bulk actions (change status, assign attorney)
- [ ] Implement PDF export for court filings
- [ ] Add vitest tests for admin dashboard API
- [ ] Style dashboard with Tailwind CSS

## Future Enhancements
- [ ] Automated email confirmations for submissions
- [ ] Document upload feature with S3 storage
- [ ] Attorney assignment and case tracking
- [ ] Email digest for new submissions
- [ ] Advanced search and analytics

## Quick Access Tools Enhancement
- [x] Add tooltip translations for Quick Access Tools (EN/ES/PT)
- [x] Implement tooltips on Action Bar buttons using shadcn/ui Tooltip component

## Navigation Fixes
- [x] Fix language selector flags to display properly
- [x] Ensure logo is positioned on the left side of navigation

## Logo Positioning
- [ ] Move logo to the left top corner of navigation

## Service Pages
- [x] Create Removal Defense page
- [x] Create Asylum & Appeals page
- [x] Create Family Petitions page
- [x] Create Bond Hearings page
- [x] Create Crimmigration page
- [x] Create Federal Litigation page
- [x] Add routes for all service pages
- [x] Update navigation links to service pages

## Navigation Update
- [x] Change Knowledge Center to Services in navigation
- [x] Update translations for Services nav item
- [x] Move Request Consultation button to top contact bar


## New Pages from Published Site
- [x] Create FAQ page with searchable categories
- [x] Create ICE Detention Process page with 9-step guide
- [x] Create Resources landing page
- [x] Create Court Sponsor Guide page
- [x] Create Downloadable Guides page
- [x] Update navigation with Resources dropdown
- [x] Add routes for all new pages

## Downloadable PDF Guides
- [x] Create Bond Hearing Checklist PDF
- [x] Create Sponsor Responsibilities Guide PDF
- [x] Update Downloads page with real PDF links

## Family Emergency Plan PDF
- [x] Create fillable Family Emergency Plan PDF template
- [x] Update Downloads page with new PDF link

## Family Emergency Plan with Document Uploads
- [x] Design database schema for emergency plans and uploaded documents
- [x] Create tRPC procedures for emergency plan CRUD operations
- [x] Implement S3 file upload for document attachments
- [x] Build interactive Family Emergency Plan page with form
- [x] Add document upload UI with drag-and-drop support
- [x] Write vitest tests for emergency plan functionality
- [x] Update Downloads page to link to interactive version

## Secure Emergency Plan Sharing
- [x] Design database schema for share links (token, expiration, password hash)
- [x] Create tRPC procedures for generating and validating share links
- [x] Build share dialog UI in Family Emergency Plan page
- [x] Create public shared plan viewer page
- [x] Add password protection for shared links
- [x] Write vitest tests for sharing functionality

## Emergency Banner Feature
- [x] Create emergency banner component for ICE detention cases
- [x] Add banner to homepage with urgent call-to-action
- [x] Make banner dismissible but persistent across sessions

## Consultation Page (from published site)
- [x] Create consultation/appointments page with form
- [x] Add attorney photo and contact information sidebar
- [x] Include consultation type dropdown, date/time pickers
- [x] Add Google Maps embed for office location


## Google Calendar Integration
- [ ] Set up Google Calendar API integration
- [ ] Request Google Calendar API credentials from user
- [ ] Create backend endpoints for fetching available time slots
- [ ] Create endpoint for booking appointments to calendar
- [ ] Update appointment form UI with real-time availability
- [ ] Write tests for calendar integration

## Link Revision from Published Site
- [x] Update Resources page with comprehensive external links matching published site
- [x] Add Services landing page with all service cards
- [x] Add Services dropdown to navigation menu
- [x] Verify all navigation links work correctly

## Multilingual Support for Services and Resources
- [ ] Add Spanish translations for Services page
- [ ] Add Portuguese translations for Services page
- [ ] Add Spanish translations for Resources page
- [ ] Add Portuguese translations for Resources page
- [ ] Update Services page to use translation keys
- [ ] Update Resources page to use translation keys

## Consultation Form Update
- [x] Update consultation form to match published site design
- [x] Include $250 consultation fee prominently
- [x] Match layout and fields from published site

## Bond Hearings Page Update
- [x] Add detailed explanation of how bond hearings work
- [x] Explain scheduling rules and procedures
- [x] Include timeline information (how long after motion is filed)
- [x] Add information about bond amounts and factors considered
- [x] Add types of immigration bonds section
- [x] Add mandatory detention information
- [x] Add translations for all three languages

## Character Reference Letters Feature
- [x] Design database schema for character reference letters
- [x] Create tRPC procedures for letter CRUD operations
- [x] Build fillable character reference letter form
- [x] Add electronic signature pad component
- [x] Generate PDF from completed letters
- [x] Add admin page for managing letter requests
- [x] Add letter templates for different case types
- [x] Write tests for letter functionality

## Asylum Page Expansion
- [x] Add detailed 1-year filing deadline information
- [x] Add exceptions to the 1-year rule
- [x] Add BIA appeals process explanation
- [x] Add appeals timeline and procedures
- [x] Add translations for all new content

## Bond Documentation Checklist Page
- [x] Review uploaded checklist documents
- [x] Create comprehensive bond documentation checklist page
- [x] Add explanations for each document type
- [x] Link to samples or online creation tools (e.g., character letter form)
- [ ] Add translations for all content

## Bond Checklist Update
- [x] Remove external links from bond document checklist
- [x] Add red notice that documents need to be translated to English
- [x] Link Sponsor Letter to automated generator (not download)
- [x] Link to sponsor requirements page
