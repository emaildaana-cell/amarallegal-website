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
