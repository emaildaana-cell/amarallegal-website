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

## LawPay Invoice Link
- [x] Add LawPay invoice link to Appointments page for $250 consultation fee

## Sponsor Letter Generator
- [x] Design database schema for sponsor letters
- [x] Create tRPC procedures for sponsor letter CRUD
- [x] Build sponsor letter generator form page
- [x] Add letter preview functionality
- [x] Generate downloadable HTML document
- [x] Write tests for sponsor letter functionality

## Detention Page Fix
- [x] Fix missing translations showing as keys (detention.hero.title, detention.step1.know_title, etc.)
- [x] Add all detention page translations to LanguageContext (EN, ES, PT)

## Character Reference Letter Redesign
- [x] Research Matter of Guerra factors for character letters
- [x] Create guided step-by-step builder with prompts (8 steps)
- [x] Add specific questions addressing each bond factor
- [x] Include examples and tips for each section
- [x] Generate professional formatted letter from responses
- [x] Add progress bar and step indicators
- [x] Add Guerra factors reference panel

## Character Letter Save & Resume Feature
- [x] Add auto-save functionality that saves progress automatically (3-second debounce)
- [x] Add visual save status indicator (saved, saving, unsaved changes)
- [x] Add "Save Now" and "Save & Exit" buttons for manual save
- [x] Show last saved timestamp when resuming
- [x] Add confirmation before leaving with unsaved changes
- [x] Show "Welcome back" notice when resuming saved progress

## Character Letter PDF Preview Feature
- [x] Create server endpoint to generate PDF preview from form data
- [x] Add PDF preview modal/panel to Review & Sign step
- [x] Allow users to view formatted letter before signing
- [x] Add "Preview Letter as PDF" button to the form
- [x] Add print functionality for preview

## Sponsor Guide Page
- [x] Create Sponsor Guide page at /sponsor-guide
- [x] Add sponsor qualifications section
- [x] Add financial requirements section
- [x] Add what judges look for section
- [x] Add Matter of Guerra factors section with sponsor roles
- [x] Add translations (EN, ES, PT)
- [x] Add navigation link in Resources dropdown

## Sponsor Document Upload Feature
- [x] Design database schema for sponsor documents (sponsorDocuments, sponsorDocumentFiles, sponsorDocumentShareLinks tables)
- [x] Create tRPC procedures for document upload, list, delete
- [x] Build sponsor document upload page at /sponsor-documents
- [x] Add file upload UI with drag-and-drop support
- [x] Implement S3 storage for uploaded documents
- [x] Add document categorization (pay stubs, tax returns, bank statements, housing docs, etc.)
- [x] Add secure access with time-limited share links and password protection
- [x] Write vitest tests for sponsor document functionality (36 tests passing)
- [x] Add link to sponsor document upload from Sponsor Guide page

## Sponsor Document Email Notifications
- [x] Add email notification when sponsor submits document package
- [x] Include sponsor name, respondent name, and document count in notification
- [x] Include full document list with categories in notification
- [x] Write vitest tests for notification functionality (7 new tests, 124 total passing)

## Admin Panel for Sponsor Documents
- [x] Create admin sponsor documents page at /admin/sponsor-documents
- [x] Add data table with all submissions (sponsor name, respondent, status, date, file count)
- [x] Add filtering by status (pending, submitted, reviewed, approved, rejected)
- [x] Add search by sponsor name or respondent name
- [x] Add document detail modal with file list and preview
- [x] Add status update functionality with admin notes
- [x] Add share link generation for sharing with attorneys (with password protection and expiry)
- [x] Add document download functionality
- [x] Ensure admin-only access protection (redirects to home if not logged in)
- [x] Create SharedDocumentsViewer page for viewing shared documents

## Admin Panel Navigation Link
- [x] Add Admin dropdown menu to main navigation (visible only when logged in)
- [x] Include links to Bond Questionnaires, Character Letters, and Sponsor Documents admin panels
- [x] Add Admin section to mobile navigation

## Bulk Download Feature for Sponsor Documents
- [x] Install archiver package for ZIP file generation
- [x] Create server-side tRPC procedure to generate ZIP of all documents
- [x] Add storageGetBuffer helper function for fetching file contents
- [x] Add bulk download button to admin panel document detail modal
- [x] Write vitest tests for bulk download functionality (7 new tests, 131 total passing)

## Site Crawl - Link and Error Check
- [x] Extract all routes from App.tsx (28 routes)
- [x] Extract all navigation links from Layout.tsx
- [x] Test each page for errors (all 28 pages return 200 OK)
- [x] Document any broken links or missing pages
- [x] Fix identified issues:
  - Fixed footer Admin Portal link (/admin → /admin/dashboard)

## SEO Meta Descriptions
- [x] Enhanced reusable SEO component with React Helmet (canonical URLs, Open Graph, Twitter cards, geo tags)
- [x] Add meta descriptions to main pages (Home, Attorneys, Contact, Consultation, Detention, etc.)
- [x] Add meta descriptions to service pages (Removal Defense, Asylum, Bond Hearings, Family Petitions, Crimmigration, Federal Litigation)
- [x] Add meta descriptions to resource pages (FAQ, Downloads, Resources, Detention Process)
- [x] Add meta descriptions to tool pages (Bond Questionnaire, Sponsor Guide, Character Letter, Sponsor Documents)
- [x] Add Open Graph tags for social sharing
- [x] Add noIndex for admin pages to prevent search engine indexing

## ICE Detention Guide Page
- [x] Create comprehensive detention guide page at /detention-guide
- [x] Explain what happens when someone is detained by ICE (4-step process)
- [x] Explain how families can communicate with detained individuals (phone, mail, visitation)
- [x] Explain what an NTA (Notice to Appear) is and what happens next
- [x] Provide complete list of ICE detention centers by region (40+ facilities with search/filter)
- [x] Include contact information (ICE Contact Center, EOIR Hotline, Freedom for Immigrants)
- [x] Add navigation links in Resources dropdown
- [x] Add translations (EN, ES, PT)

## Extensive Practice Area Pages
- [x] Expand Removal Defense page with comprehensive content (types, defenses, process, eligibility, FAQs)
- [x] Expand Asylum & Appeals page with comprehensive content (types, process, timeline, evidence, FAQs)
- [x] Expand Family Petitions page with comprehensive content (categories, process, wait times, documents, FAQs)
- [x] Expand Bond Hearings page with comprehensive content (types, factors, process, preparation, FAQs)
- [x] Expand Crimmigration page with comprehensive content (crimes, consequences, defenses, relief options, FAQs)
- [x] Expand Federal Litigation page with comprehensive content (types, process, appeals, habeas corpus, FAQs)

## SEO Fixes
- [x] Fix homepage meta description length (171 chars → 113 chars)

## Detailed ICE Detention Process Page
- [x] Create comprehensive page at /ice-detention-process
- [x] Phase 1: The Arrest (how arrests occur, rights during arrest)
- [x] Phase 2: Initial Processing (booking, A-Number assignment)
- [x] Phase 3: Custody Determination (release options, factors considered, mandatory detention)
- [x] Phase 4: Notice to Appear (NTA contents, common charges, service)
- [x] Phase 5: Transfer to Detention Facility (facility types, what happens)
- [x] Phase 6: First Court Appearance (master calendar hearing, outcomes)
- [x] Phase 7: Bond Hearing (Matter of Guerra factors, outcomes)
- [x] Timeline summary table
- [x] Family action steps section (6 immediate actions)
- [x] Add translations (EN, ES, PT)
- [x] Add navigation link in Resources dropdown
## Know Your Rights Card
- [x] Create printable Know Your Rights card page at /know-your-rights
- [x] Include key rights during ICE encounters (remain silent, refuse entry, attorney, not sign)
- [x] Design wallet-sized card format (front and back)
- [x] Add print functionality with proper print CSS
- [x] Generate downloadable PDF version (EN, ES, PT cards)
- [x] Add translations (EN, ES, PT)
- [x] Add navigation link in Resources dropdown
- [x] Add additional info sections (judicial vs admin warrant, if arrested steps, for families)

## Safari Compatibility Fix
- [x] Identify Safari-specific CSS/JS issues (OKLCH colors not supported in older Safari)
- [x] Replace OKLCH colors with hex color values for full Safari compatibility
- [x] Add Safari-specific meta tags (apple-mobile-web-app-capable, format-detection)
- [x] Enable Google Fonts properly (were commented out)
- [x] Test and verify fix (131 tests passing)
