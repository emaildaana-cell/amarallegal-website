#!/usr/bin/env python3
"""
Generate Family Emergency Plan Fillable PDF for Amaral Law
Uses reportlab for form fields support
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfform
from reportlab.lib.styles import getSampleStyleSheet
import os

# Colors
NAVY = HexColor('#1a365d')
GOLD = HexColor('#d4af37')
LIGHT_GRAY = HexColor('#f5f5f5')
DARK_GRAY = HexColor('#333333')

def create_text_field(c, name, x, y, width, height, value=""):
    """Create a fillable text field"""
    c.acroForm.textfield(
        name=name,
        tooltip=name,
        x=x,
        y=y,
        width=width,
        height=height,
        borderColor=NAVY,
        fillColor=white,
        textColor=black,
        forceBorder=True,
        fontSize=10,
        fieldFlags='',
        value=value
    )

def create_checkbox(c, name, x, y, size=12):
    """Create a checkbox field"""
    c.acroForm.checkbox(
        name=name,
        tooltip=name,
        x=x,
        y=y,
        size=size,
        borderColor=NAVY,
        fillColor=white,
        buttonStyle='check',
        checked=False
    )

def draw_header(c, page_height):
    """Draw the header with branding"""
    # Navy header bar
    c.setFillColor(NAVY)
    c.rect(0, page_height - 60, 612, 60, fill=1, stroke=0)
    
    # Title
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(40, page_height - 35, "AMARAL LAW")
    c.setFont("Helvetica", 10)
    c.drawString(40, page_height - 50, "Immigration Defense Attorneys")
    
    # Contact info
    c.setFont("Helvetica-Bold", 11)
    c.drawRightString(572, page_height - 30, "1-844-423-3733")
    c.setFont("Helvetica", 9)
    c.drawRightString(572, page_height - 45, "amarallegal.com")

def draw_footer(c, page_num, page_height):
    """Draw footer with page number and disclaimer"""
    c.setFillColor(HexColor('#888888'))
    c.setFont("Helvetica-Oblique", 8)
    c.drawCentredString(306, 30, f"Page {page_num}")
    c.drawCentredString(306, 18, "Keep this document in a safe, accessible location. Share copies with trusted family members.")

def draw_section_header(c, title, y):
    """Draw a section header with gold underline"""
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, y, title)
    c.setStrokeColor(GOLD)
    c.setLineWidth(2)
    c.line(40, y - 5, 250, y - 5)
    return y - 25

def draw_label(c, text, x, y, bold=False):
    """Draw a form label"""
    c.setFillColor(DARK_GRAY)
    if bold:
        c.setFont("Helvetica-Bold", 10)
    else:
        c.setFont("Helvetica", 10)
    c.drawString(x, y, text)

def create_emergency_plan():
    output_path = '/home/ubuntu/amaral-law/client/public/downloads/family-emergency-plan.pdf'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    c = canvas.Canvas(output_path, pagesize=letter)
    width, height = letter
    
    # ============ PAGE 1 ============
    draw_header(c, height)
    
    # Main title
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 24)
    c.drawCentredString(306, height - 100, "Family Emergency Plan")
    c.setFillColor(HexColor('#666666'))
    c.setFont("Helvetica", 11)
    c.drawCentredString(306, height - 120, "Complete this form and keep copies in a safe, accessible location")
    
    # Important notice box
    c.setFillColor(HexColor('#fff8dc'))
    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    c.rect(40, height - 185, 532, 50, fill=1, stroke=1)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(50, height - 155, "IMPORTANT:")
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica", 9)
    c.drawString(115, height - 155, "This plan should be completed by all family members who may be at risk.")
    c.drawString(50, height - 170, "Review and update this document every 6 months or when circumstances change.")
    
    y = height - 220
    
    # Section 1: Family Information
    y = draw_section_header(c, "1. Family Information", y)
    
    draw_label(c, "Head of Household:", 40, y)
    create_text_field(c, "head_of_household", 160, y - 5, 200, 18)
    draw_label(c, "Date Completed:", 380, y)
    create_text_field(c, "date_completed", 480, y - 5, 92, 18)
    y -= 35
    
    draw_label(c, "Address:", 40, y)
    create_text_field(c, "address", 100, y - 5, 472, 18)
    y -= 35
    
    draw_label(c, "City:", 40, y)
    create_text_field(c, "city", 70, y - 5, 150, 18)
    draw_label(c, "State:", 240, y)
    create_text_field(c, "state", 280, y - 5, 80, 18)
    draw_label(c, "ZIP:", 380, y)
    create_text_field(c, "zip", 410, y - 5, 80, 18)
    y -= 50
    
    # Section 2: Emergency Contacts
    y = draw_section_header(c, "2. Emergency Contacts", y)
    
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(40, y, "List trusted people who can help in an emergency. They should have copies of this plan.")
    y -= 25
    
    for i in range(1, 4):
        draw_label(c, f"Contact {i}:", 40, y, bold=True)
        y -= 20
        draw_label(c, "Name:", 50, y)
        create_text_field(c, f"contact{i}_name", 90, y - 5, 180, 18)
        draw_label(c, "Relationship:", 290, y)
        create_text_field(c, f"contact{i}_relationship", 365, y - 5, 130, 18)
        y -= 25
        draw_label(c, "Phone:", 50, y)
        create_text_field(c, f"contact{i}_phone", 95, y - 5, 130, 18)
        draw_label(c, "Alt Phone:", 245, y)
        create_text_field(c, f"contact{i}_alt_phone", 310, y - 5, 100, 18)
        y -= 25
        draw_label(c, "Address:", 50, y)
        create_text_field(c, f"contact{i}_address", 105, y - 5, 390, 18)
        y -= 35
    
    draw_footer(c, 1, height)
    c.showPage()
    
    # ============ PAGE 2 ============
    draw_header(c, height)
    y = height - 90
    
    # Section 3: Children Information
    y = draw_section_header(c, "3. Children Information", y)
    
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(40, y, "Complete for each child. Include school contact information and any special needs.")
    y -= 25
    
    for i in range(1, 4):
        draw_label(c, f"Child {i}:", 40, y, bold=True)
        y -= 20
        draw_label(c, "Full Name:", 50, y)
        create_text_field(c, f"child{i}_name", 115, y - 5, 170, 18)
        draw_label(c, "DOB:", 305, y)
        create_text_field(c, f"child{i}_dob", 340, y - 5, 80, 18)
        draw_label(c, "US Citizen?", 440, y)
        create_checkbox(c, f"child{i}_citizen", 510, y - 3)
        y -= 25
        draw_label(c, "School:", 50, y)
        create_text_field(c, f"child{i}_school", 95, y - 5, 200, 18)
        draw_label(c, "School Phone:", 315, y)
        create_text_field(c, f"child{i}_school_phone", 395, y - 5, 100, 18)
        y -= 25
        draw_label(c, "Special Needs/Medical:", 50, y)
        create_text_field(c, f"child{i}_special_needs", 175, y - 5, 320, 18)
        y -= 35
    
    # Section 4: Designated Caregiver
    y = draw_section_header(c, "4. Designated Caregiver for Children", y)
    
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(40, y, "This person will care for your children if you are detained. Consider completing a Power of Attorney.")
    y -= 25
    
    draw_label(c, "Primary Caregiver:", 40, y, bold=True)
    y -= 20
    draw_label(c, "Name:", 50, y)
    create_text_field(c, "caregiver_name", 90, y - 5, 200, 18)
    draw_label(c, "Relationship:", 310, y)
    create_text_field(c, f"caregiver_relationship", 385, y - 5, 110, 18)
    y -= 25
    draw_label(c, "Phone:", 50, y)
    create_text_field(c, "caregiver_phone", 95, y - 5, 130, 18)
    draw_label(c, "Address:", 245, y)
    create_text_field(c, "caregiver_address", 300, y - 5, 195, 18)
    y -= 35
    
    draw_label(c, "Alternate Caregiver:", 40, y, bold=True)
    y -= 20
    draw_label(c, "Name:", 50, y)
    create_text_field(c, "alt_caregiver_name", 90, y - 5, 200, 18)
    draw_label(c, "Phone:", 310, y)
    create_text_field(c, "alt_caregiver_phone", 355, y - 5, 140, 18)
    
    draw_footer(c, 2, height)
    c.showPage()
    
    # ============ PAGE 3 ============
    draw_header(c, height)
    y = height - 90
    
    # Section 5: Important Documents Location
    y = draw_section_header(c, "5. Important Documents Location", y)
    
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(40, y, "Record where important documents are stored. Keep originals in a safe place; give copies to trusted contacts.")
    y -= 30
    
    documents = [
        ("Birth Certificates", "birth_cert"),
        ("Passports", "passports"),
        ("Social Security Cards", "ssn_cards"),
        ("Immigration Documents (Visa, Green Card, Work Permit)", "immigration_docs"),
        ("Marriage Certificate", "marriage_cert"),
        ("Power of Attorney", "poa"),
        ("Medical Records", "medical_records"),
        ("School Records", "school_records"),
        ("Financial Documents (Bank Info, Deeds)", "financial_docs"),
        ("Insurance Policies", "insurance"),
    ]
    
    draw_label(c, "Document", 50, y, bold=True)
    draw_label(c, "Location", 280, y, bold=True)
    draw_label(c, "Copy Given To", 450, y, bold=True)
    y -= 5
    c.setStrokeColor(HexColor('#cccccc'))
    c.line(40, y, 572, y)
    y -= 20
    
    for doc_name, field_name in documents:
        draw_label(c, doc_name, 50, y)
        create_text_field(c, f"{field_name}_location", 280, y - 5, 150, 16)
        create_text_field(c, f"{field_name}_copy", 450, y - 5, 110, 16)
        y -= 25
    
    y -= 10
    
    # Section 6: Financial Information
    y = draw_section_header(c, "6. Financial Information", y)
    
    draw_label(c, "Bank Name:", 40, y)
    create_text_field(c, "bank_name", 110, y - 5, 180, 18)
    draw_label(c, "Account #:", 310, y)
    create_text_field(c, "bank_account", 375, y - 5, 120, 18)
    y -= 30
    draw_label(c, "Person with access to accounts:", 40, y)
    create_text_field(c, "bank_access_person", 220, y - 5, 275, 18)
    
    draw_footer(c, 3, height)
    c.showPage()
    
    # ============ PAGE 4 ============
    draw_header(c, height)
    y = height - 90
    
    # Section 7: Attorney Information
    y = draw_section_header(c, "7. Attorney Information", y)
    
    draw_label(c, "Immigration Attorney:", 40, y)
    create_text_field(c, "attorney_name", 170, y - 5, 200, 18)
    y -= 30
    draw_label(c, "Phone:", 40, y)
    create_text_field(c, "attorney_phone", 85, y - 5, 150, 18)
    draw_label(c, "Email:", 260, y)
    create_text_field(c, "attorney_email", 300, y - 5, 195, 18)
    y -= 30
    draw_label(c, "A-Number (if applicable):", 40, y)
    create_text_field(c, "a_number", 185, y - 5, 150, 18)
    y -= 40
    
    # Section 8: Know Your Rights
    y = draw_section_header(c, "8. Know Your Rights", y)
    
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica", 10)
    rights = [
        "You have the right to remain silent. You do not have to answer questions about your immigration status.",
        "You have the right to speak with an attorney before answering any questions.",
        "You do not have to open your door unless ICE has a warrant signed by a judge.",
        "You have the right to make a phone call if detained.",
        "You have the right to a bond hearing in most cases.",
    ]
    
    for i, right in enumerate(rights, 1):
        c.setFont("Helvetica-Bold", 10)
        c.drawString(50, y, f"{i}.")
        c.setFont("Helvetica", 10)
        # Wrap text manually
        words = right.split()
        line = ""
        x_start = 70
        for word in words:
            test_line = line + word + " "
            if c.stringWidth(test_line, "Helvetica", 10) < 490:
                line = test_line
            else:
                c.drawString(x_start, y, line.strip())
                y -= 15
                line = word + " "
                x_start = 70
        c.drawString(x_start, y, line.strip())
        y -= 25
    
    y -= 10
    
    # Section 9: If Detained - Action Steps
    y = draw_section_header(c, "9. If Detained - Action Steps", y)
    
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica", 10)
    steps = [
        "Stay calm. Do not resist or run.",
        "Say: 'I wish to remain silent. I want to speak with an attorney.'",
        "Do not sign any documents without an attorney present.",
        "Memorize your emergency contact's phone number.",
        "Ask to make a phone call as soon as possible.",
        "Tell your attorney or family member which facility you are being held at.",
    ]
    
    for i, step in enumerate(steps, 1):
        c.setFont("Helvetica-Bold", 10)
        c.setFillColor(NAVY)
        c.drawString(50, y, f"Step {i}:")
        c.setFont("Helvetica", 10)
        c.setFillColor(DARK_GRAY)
        c.drawString(100, y, step)
        y -= 20
    
    # Contact box at bottom
    y -= 20
    c.setFillColor(NAVY)
    c.rect(40, y - 50, 532, 60, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, y - 10, "Need Legal Help? Contact Amaral Law")
    c.setFont("Helvetica", 10)
    c.drawString(50, y - 28, "Phone: 1-844-423-3733  |  WhatsApp: (619) 867-1707")
    c.drawString(50, y - 43, "Email: ap@amarallegal.com  |  Web: amarallegal.com")
    
    draw_footer(c, 4, height)
    
    c.save()
    print(f'PDF created: {output_path}')
    return output_path

if __name__ == '__main__':
    create_emergency_plan()
