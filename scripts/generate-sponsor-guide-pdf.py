#!/usr/bin/env python3
"""
Generate Sponsor Responsibilities Guide PDF for Amaral Law
"""

from fpdf import FPDF
import os

class SponsorGuidePDF(FPDF):
    def __init__(self):
        super().__init__()
        self.set_auto_page_break(auto=True, margin=20)
        
    def header(self):
        # Logo placeholder - navy blue header bar
        self.set_fill_color(26, 54, 93)  # Navy blue
        self.rect(0, 0, 210, 25, 'F')
        
        # Title in header
        self.set_font('Helvetica', 'B', 16)
        self.set_text_color(255, 255, 255)
        self.set_xy(10, 8)
        self.cell(0, 10, 'AMARAL LAW', 0, 0, 'L')
        
        # Subtitle
        self.set_font('Helvetica', '', 10)
        self.set_xy(10, 15)
        self.cell(0, 5, 'Immigration Defense Attorneys', 0, 0, 'L')
        
        # Contact info
        self.set_xy(150, 8)
        self.set_font('Helvetica', 'B', 10)
        self.cell(0, 5, '1-844-423-3733', 0, 0, 'R')
        self.set_xy(150, 14)
        self.set_font('Helvetica', '', 8)
        self.cell(0, 5, 'amarallegal.com', 0, 0, 'R')
        
        self.ln(30)
        
    def footer(self):
        self.set_y(-20)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')
        self.ln(5)
        self.cell(0, 5, 'This guide is for informational purposes only and does not constitute legal advice.', 0, 0, 'C')
        
    def section_title(self, title):
        self.set_font('Helvetica', 'B', 14)
        self.set_text_color(26, 54, 93)
        self.cell(0, 10, title, 0, 1, 'L')
        self.set_draw_color(212, 175, 55)  # Gold
        self.set_line_width(0.5)
        self.line(10, self.get_y(), 100, self.get_y())
        self.ln(5)
        
    def subsection_title(self, title):
        self.set_font('Helvetica', 'B', 11)
        self.set_text_color(26, 54, 93)
        self.cell(0, 8, title, 0, 1, 'L')
        self.ln(2)
        
    def body_text(self, text):
        self.set_font('Helvetica', '', 10)
        self.set_text_color(51, 51, 51)
        self.multi_cell(0, 6, text, 0, 'L')
        self.ln(3)
        
    def bullet_item(self, text, indent=0):
        self.set_font('Helvetica', '', 10)
        self.set_text_color(51, 51, 51)
        x = 15 + indent
        self.set_x(x)
        self.cell(5, 6, chr(149), 0, 0)  # Bullet point
        self.multi_cell(175 - indent, 6, text, 0, 'L')
        self.ln(1)
        
    def info_box(self, title, content, color='gray'):
        if color == 'gold':
            self.set_fill_color(255, 248, 220)
            self.set_draw_color(212, 175, 55)
        elif color == 'blue':
            self.set_fill_color(230, 240, 250)
            self.set_draw_color(26, 54, 93)
        else:
            self.set_fill_color(240, 240, 240)
            self.set_draw_color(128, 128, 128)
            
        y_start = self.get_y()
        self.set_font('Helvetica', 'B', 10)
        self.set_text_color(26, 54, 93)
        self.set_x(15)
        self.cell(180, 8, title, 0, 1, 'L')
        self.set_font('Helvetica', '', 9)
        self.set_text_color(51, 51, 51)
        self.set_x(15)
        self.multi_cell(180, 5, content, 0, 'L')
        y_end = self.get_y()
        self.rect(12, y_start - 2, 186, y_end - y_start + 6, 'DF')
        self.ln(8)
        
    def comparison_table(self):
        # Table header
        self.set_fill_color(26, 54, 93)
        self.set_text_color(255, 255, 255)
        self.set_font('Helvetica', 'B', 10)
        self.cell(60, 10, 'Aspect', 1, 0, 'C', True)
        self.cell(65, 10, 'Court Sponsor', 1, 0, 'C', True)
        self.cell(65, 10, 'USCIS Sponsor', 1, 1, 'C', True)
        
        # Table rows
        self.set_text_color(51, 51, 51)
        self.set_font('Helvetica', '', 9)
        
        rows = [
            ('Purpose', 'Secure release from\ndetention', 'Support immigration\napplication'),
            ('Legal Status\nRequired', 'Not always required', 'Usually required'),
            ('Financial\nRequirements', 'Must show ability to\nhouse detainee', 'Must meet income\nthreshold (125% FPL)'),
            ('Duration', 'Until case is resolved', '10 years or until\nnaturalization'),
            ('Court\nAppearance', 'May need to testify\nat bond hearing', 'Typically not required'),
            ('Liability', 'Ensure court\nattendance', 'Financial support\nif needed'),
        ]
        
        for row in rows:
            self.set_fill_color(250, 250, 250)
            h = 14
            self.cell(60, h, row[0], 1, 0, 'L', True)
            self.cell(65, h, row[1], 1, 0, 'C')
            self.cell(65, h, row[2], 1, 1, 'C')
        
        self.ln(5)

def create_sponsor_guide():
    pdf = SponsorGuidePDF()
    pdf.add_page()
    
    # Main title
    pdf.set_font('Helvetica', 'B', 24)
    pdf.set_text_color(26, 54, 93)
    pdf.cell(0, 15, 'Sponsor Responsibilities Guide', 0, 1, 'C')
    pdf.set_font('Helvetica', '', 12)
    pdf.set_text_color(128, 128, 128)
    pdf.cell(0, 8, 'Understanding Your Role as an Immigration Sponsor', 0, 1, 'C')
    pdf.ln(10)
    
    # Introduction
    pdf.section_title('What is a Sponsor?')
    pdf.body_text(
        'A sponsor is someone who agrees to support an immigrant during their immigration '
        'proceedings. There are two main types of sponsors in immigration law: Court Sponsors '
        '(for bond hearings) and USCIS Sponsors (for visa petitions). Understanding the '
        'differences and responsibilities is crucial before agreeing to sponsor someone.'
    )
    
    # Comparison table
    pdf.section_title('Court Sponsor vs. USCIS Sponsor')
    pdf.comparison_table()
    
    # Court Sponsor Section
    pdf.add_page()
    pdf.section_title('Court Sponsor Responsibilities')
    
    pdf.subsection_title('Who Can Be a Court Sponsor?')
    pdf.bullet_item('U.S. citizens or lawful permanent residents (preferred)')
    pdf.bullet_item('Individuals with valid immigration status')
    pdf.bullet_item('In some cases, undocumented individuals with strong ties')
    pdf.bullet_item('Must be at least 18 years old')
    pdf.bullet_item('Must have stable residence and income')
    pdf.ln(3)
    
    pdf.subsection_title('Primary Responsibilities')
    pdf.bullet_item('Ensure the detainee attends ALL court hearings')
    pdf.bullet_item('Provide housing for the released individual')
    pdf.bullet_item('Report any address changes to ICE and the court')
    pdf.bullet_item('Maintain contact with the detainee\'s attorney')
    pdf.bullet_item('Notify authorities if the detainee fails to comply')
    pdf.ln(3)
    
    pdf.info_box(
        'IMPORTANT: Court Appearance Obligation',
        'As a court sponsor, you are vouching that the detainee will appear at all scheduled '
        'court hearings. If the detainee fails to appear, it can affect future bond requests '
        'and may have consequences for you as well. Take this responsibility seriously.',
        'gold'
    )
    
    pdf.subsection_title('Documents You\'ll Need to Provide')
    pdf.bullet_item('Valid government-issued photo ID')
    pdf.bullet_item('Proof of legal status (if applicable)')
    pdf.bullet_item('Proof of residence (lease, mortgage, utility bills)')
    pdf.bullet_item('Proof of employment and income')
    pdf.bullet_item('Recent tax returns (1-2 years)')
    pdf.bullet_item('Bank statements')
    pdf.bullet_item('Letter explaining your relationship to the detainee')
    
    # USCIS Sponsor Section
    pdf.add_page()
    pdf.section_title('USCIS Sponsor (Affidavit of Support)')
    
    pdf.subsection_title('What is an Affidavit of Support?')
    pdf.body_text(
        'An Affidavit of Support (Form I-864) is a legally binding contract between a sponsor '
        'and the U.S. government. By signing, you agree to financially support the immigrant '
        'and reimburse the government for any means-tested public benefits they receive.'
    )
    
    pdf.subsection_title('Income Requirements')
    pdf.body_text(
        'You must demonstrate income at or above 125% of the Federal Poverty Guidelines for '
        'your household size (including the immigrant). For 2024, this means:'
    )
    pdf.bullet_item('Household of 2: $25,550/year minimum')
    pdf.bullet_item('Household of 3: $32,188/year minimum')
    pdf.bullet_item('Household of 4: $38,825/year minimum')
    pdf.bullet_item('Add $6,638 for each additional person')
    pdf.ln(3)
    
    pdf.subsection_title('Duration of Obligation')
    pdf.body_text(
        'Your obligation as a USCIS sponsor continues until one of the following occurs:'
    )
    pdf.bullet_item('The immigrant becomes a U.S. citizen')
    pdf.bullet_item('The immigrant has worked 40 qualifying quarters')
    pdf.bullet_item('The immigrant permanently leaves the United States')
    pdf.bullet_item('The immigrant dies')
    pdf.bullet_item('You (the sponsor) die')
    pdf.ln(3)
    
    pdf.info_box(
        'Financial Liability Warning',
        'As a USCIS sponsor, you can be sued by the government or the immigrant for financial '
        'support. This obligation survives divorce - if you sponsor your spouse and later '
        'divorce, you may still be financially responsible. Consult an attorney before signing.',
        'gold'
    )
    
    # Tips for Sponsors
    pdf.add_page()
    pdf.section_title('Tips for Being a Successful Sponsor')
    
    pdf.bullet_item('Understand your obligations BEFORE agreeing to sponsor')
    pdf.bullet_item('Keep copies of all documents you submit')
    pdf.bullet_item('Maintain open communication with the immigrant')
    pdf.bullet_item('Keep records of any financial support you provide')
    pdf.bullet_item('Update your contact information if you move')
    pdf.bullet_item('Attend court hearings if requested (court sponsors)')
    pdf.bullet_item('Consult with an immigration attorney if you have questions')
    pdf.ln(5)
    
    pdf.section_title('Frequently Asked Questions')
    
    pdf.subsection_title('Can I withdraw my sponsorship?')
    pdf.body_text(
        'For court sponsors, withdrawing sponsorship is difficult once bond is granted and '
        'may require court approval. For USCIS sponsors, you generally cannot withdraw the '
        'Affidavit of Support after the immigrant is admitted.'
    )
    
    pdf.subsection_title('What if I can\'t meet the income requirements?')
    pdf.body_text(
        'You may be able to use a joint sponsor (someone else who meets the requirements) '
        'or include assets to meet the threshold. Consult an attorney for options.'
    )
    
    pdf.subsection_title('Can a sponsor be held responsible for the immigrant\'s actions?')
    pdf.body_text(
        'Court sponsors may face scrutiny if the immigrant fails to appear at hearings. '
        'USCIS sponsors are primarily responsible for financial support, not behavior.'
    )
    
    # Contact section
    pdf.ln(10)
    pdf.set_fill_color(26, 54, 93)
    pdf.rect(10, pdf.get_y(), 190, 30, 'F')
    pdf.set_text_color(255, 255, 255)
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_xy(15, pdf.get_y() + 5)
    pdf.cell(0, 8, 'Questions About Sponsorship? Contact Amaral Law', 0, 1, 'L')
    pdf.set_font('Helvetica', '', 10)
    pdf.set_x(15)
    pdf.cell(0, 6, 'Phone: 1-844-423-3733  |  WhatsApp: (619) 867-1707', 0, 1, 'L')
    pdf.set_x(15)
    pdf.cell(0, 6, 'Email: ap@amarallegal.com  |  Web: amarallegal.com', 0, 1, 'L')
    
    # Save PDF
    output_path = '/home/ubuntu/amaral-law/client/public/downloads/sponsor-responsibilities-guide.pdf'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    pdf.output(output_path)
    print(f'PDF created: {output_path}')
    return output_path

if __name__ == '__main__':
    create_sponsor_guide()
