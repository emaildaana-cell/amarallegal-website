#!/usr/bin/env python3
"""
Generate Bond Hearing Checklist PDF for Amaral Law
"""

from fpdf import FPDF
import os

class BondChecklistPDF(FPDF):
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
        self.cell(0, 5, 'This checklist is for informational purposes only and does not constitute legal advice.', 0, 0, 'C')
        
    def section_title(self, title):
        self.set_font('Helvetica', 'B', 14)
        self.set_text_color(26, 54, 93)
        self.cell(0, 10, title, 0, 1, 'L')
        self.set_draw_color(212, 175, 55)  # Gold
        self.set_line_width(0.5)
        self.line(10, self.get_y(), 100, self.get_y())
        self.ln(5)
        
    def checkbox_item(self, text, indent=0):
        self.set_font('Helvetica', '', 10)
        self.set_text_color(51, 51, 51)
        x = 15 + indent
        self.set_x(x)
        # Draw checkbox
        self.rect(x, self.get_y() + 1, 4, 4)
        self.set_x(x + 7)
        self.multi_cell(175 - indent, 6, text, 0, 'L')
        self.ln(2)
        
    def info_box(self, title, content):
        self.set_fill_color(240, 240, 240)
        self.set_draw_color(212, 175, 55)
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
        self.rect(12, y_start - 2, 186, y_end - y_start + 6, 'D')
        self.ln(8)

def create_bond_checklist():
    pdf = BondChecklistPDF()
    pdf.add_page()
    
    # Main title
    pdf.set_font('Helvetica', 'B', 24)
    pdf.set_text_color(26, 54, 93)
    pdf.cell(0, 15, 'Bond Hearing Checklist', 0, 1, 'C')
    pdf.set_font('Helvetica', '', 12)
    pdf.set_text_color(128, 128, 128)
    pdf.cell(0, 8, 'Essential Documents & Evidence for Your Immigration Bond Hearing', 0, 1, 'C')
    pdf.ln(10)
    
    # Important notice
    pdf.info_box(
        'IMPORTANT: Your One Chance at Freedom',
        'A bond hearing is often your only opportunity to secure release from detention. '
        'The judge will evaluate two main factors: (1) whether you are a flight risk, and '
        '(2) whether you pose a danger to the community. Gathering strong evidence for both '
        'factors is critical to your success.'
    )
    
    # Section 1: Identity Documents
    pdf.section_title('1. Identity & Immigration Documents')
    pdf.checkbox_item('Valid passport or travel document')
    pdf.checkbox_item('Birth certificate (with certified translation if not in English)')
    pdf.checkbox_item('Any prior immigration documents (visa, I-94, work permits)')
    pdf.checkbox_item('A-Number documentation')
    pdf.checkbox_item('Notice to Appear (NTA)')
    pdf.checkbox_item('Any prior immigration court decisions')
    pdf.ln(5)
    
    # Section 2: Proving Community Ties
    pdf.section_title('2. Evidence of Community Ties (Flight Risk)')
    pdf.checkbox_item('Proof of U.S. residence (lease, mortgage, utility bills)')
    pdf.checkbox_item('Employment verification letter from employer')
    pdf.checkbox_item('Recent pay stubs (last 3-6 months)')
    pdf.checkbox_item('Tax returns (last 2-3 years)')
    pdf.checkbox_item('Bank statements showing financial stability')
    pdf.checkbox_item('Property ownership documents')
    pdf.checkbox_item('Children\'s birth certificates (if U.S. citizen children)')
    pdf.checkbox_item('Children\'s school enrollment records')
    pdf.checkbox_item('Marriage certificate (if married to U.S. citizen/resident)')
    pdf.checkbox_item('Church or community organization membership letters')
    pdf.checkbox_item('Volunteer work documentation')
    pdf.ln(5)
    
    # Section 3: Character Evidence
    pdf.section_title('3. Character & Rehabilitation Evidence')
    pdf.checkbox_item('Letters of support from family members')
    pdf.checkbox_item('Letters of support from employers')
    pdf.checkbox_item('Letters from community leaders, clergy, or teachers')
    pdf.checkbox_item('Certificates of completion (education, training programs)')
    pdf.checkbox_item('Rehabilitation program certificates (if applicable)')
    pdf.checkbox_item('Counseling or therapy records (if applicable)')
    pdf.checkbox_item('Evidence of community service')
    
    pdf.add_page()
    
    # Section 4: Criminal History
    pdf.section_title('4. Criminal History Documentation')
    pdf.checkbox_item('Certified court dispositions for all arrests/convictions')
    pdf.checkbox_item('Proof of sentence completion (probation, parole)')
    pdf.checkbox_item('Letters from probation/parole officers')
    pdf.checkbox_item('Evidence of rehabilitation since conviction')
    pdf.checkbox_item('Character letters addressing past mistakes')
    pdf.ln(5)
    
    # Section 5: Sponsor Information
    pdf.section_title('5. Sponsor Documentation')
    pdf.checkbox_item('Sponsor\'s valid government-issued ID')
    pdf.checkbox_item('Sponsor\'s proof of legal status (if applicable)')
    pdf.checkbox_item('Sponsor\'s proof of residence')
    pdf.checkbox_item('Sponsor\'s employment verification')
    pdf.checkbox_item('Sponsor\'s recent pay stubs')
    pdf.checkbox_item('Sponsor\'s tax returns')
    pdf.checkbox_item('Sponsor\'s letter of support explaining relationship')
    pdf.checkbox_item('Sponsor\'s affidavit of support (Form I-134 if applicable)')
    pdf.ln(5)
    
    # Section 6: Medical/Humanitarian
    pdf.section_title('6. Medical & Humanitarian Factors')
    pdf.checkbox_item('Medical records documenting health conditions')
    pdf.checkbox_item('Letters from treating physicians')
    pdf.checkbox_item('Prescription medication documentation')
    pdf.checkbox_item('Mental health treatment records (if applicable)')
    pdf.checkbox_item('Documentation of family members\' medical needs')
    pdf.checkbox_item('Evidence of hardship to family if detained')
    pdf.ln(5)
    
    # Tips box
    pdf.info_box(
        'Tips for Success',
        '1. Organize documents chronologically and by category\n'
        '2. Provide certified translations for all non-English documents\n'
        '3. Make at least 3 copies of everything (judge, ICE, your attorney)\n'
        '4. Prepare your sponsor to testify if needed\n'
        '5. Be honest - any inconsistencies can hurt your case\n'
        '6. Contact an attorney as soon as possible after detention'
    )
    
    # Contact section
    pdf.ln(10)
    pdf.set_fill_color(26, 54, 93)
    pdf.rect(10, pdf.get_y(), 190, 30, 'F')
    pdf.set_text_color(255, 255, 255)
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_xy(15, pdf.get_y() + 5)
    pdf.cell(0, 8, 'Need Help? Contact Amaral Law Today', 0, 1, 'L')
    pdf.set_font('Helvetica', '', 10)
    pdf.set_x(15)
    pdf.cell(0, 6, 'Phone: 1-844-423-3733  |  WhatsApp: (619) 867-1707', 0, 1, 'L')
    pdf.set_x(15)
    pdf.cell(0, 6, 'Email: ap@amarallegal.com  |  Web: amarallegal.com', 0, 1, 'L')
    
    # Save PDF
    output_path = '/home/ubuntu/amaral-law/client/public/downloads/bond-hearing-checklist.pdf'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    pdf.output(output_path)
    print(f'PDF created: {output_path}')
    return output_path

if __name__ == '__main__':
    create_bond_checklist()
