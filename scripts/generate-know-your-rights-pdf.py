#!/usr/bin/env python3
"""
Generate Know Your Rights PDF card for ICE encounters.
Creates a wallet-sized printable card with key rights information.
"""

from fpdf import FPDF
import os

class KnowYourRightsPDF(FPDF):
    def __init__(self):
        super().__init__(orientation='P', unit='in', format='letter')
        self.set_auto_page_break(auto=False)
        
    def add_card_front(self, x, y, lang='en'):
        """Add the front of the Know Your Rights card"""
        # Card dimensions (standard business card: 3.5" x 2")
        card_width = 3.5
        card_height = 2
        
        # Draw card background (dark blue)
        self.set_fill_color(30, 58, 95)  # Primary blue
        self.rect(x, y, card_width, card_height, 'F')
        
        # Draw border
        self.set_draw_color(212, 175, 55)  # Gold border
        self.set_line_width(0.02)
        self.rect(x + 0.05, y + 0.05, card_width - 0.1, card_height - 0.1)
        
        # Title
        self.set_font('Helvetica', 'B', 11)
        self.set_text_color(255, 255, 255)
        self.set_xy(x, y + 0.1)
        self.cell(card_width, 0.2, 'KNOW YOUR RIGHTS', align='C')
        
        # Subtitle
        self.set_font('Helvetica', '', 8)
        self.set_text_color(212, 175, 55)
        self.set_xy(x, y + 0.3)
        self.cell(card_width, 0.15, 'WITH ICE', align='C')
        
        # Rights content
        self.set_font('Helvetica', '', 6)
        self.set_text_color(255, 255, 255)
        
        rights = [
            ("RIGHT TO REMAIN SILENT:", "You do not have to answer questions about where you were born or your immigration status."),
            ("RIGHT TO REFUSE ENTRY:", "ICE cannot enter your home without a judicial warrant signed by a judge."),
            ("RIGHT TO AN ATTORNEY:", "You have the right to speak with a lawyer before answering any questions."),
            ("RIGHT TO NOT SIGN:", "Do not sign any documents without first speaking to an attorney.")
        ]
        
        y_pos = y + 0.5
        for title, text in rights:
            self.set_font('Helvetica', 'B', 5)
            self.set_xy(x + 0.1, y_pos)
            self.cell(0.1, 0.1, chr(252), align='L')  # Checkmark
            self.set_xy(x + 0.2, y_pos)
            self.cell(card_width - 0.3, 0.1, title)
            
            self.set_font('Helvetica', '', 5)
            self.set_xy(x + 0.2, y_pos + 0.1)
            self.multi_cell(card_width - 0.3, 0.08, text)
            y_pos += 0.35
            
    def add_card_back(self, x, y, lang='en'):
        """Add the back of the Know Your Rights card"""
        card_width = 3.5
        card_height = 2
        
        # Draw card background (white)
        self.set_fill_color(255, 255, 255)
        self.rect(x, y, card_width, card_height, 'F')
        
        # Draw border
        self.set_draw_color(30, 58, 95)
        self.set_line_width(0.02)
        self.rect(x + 0.02, y + 0.02, card_width - 0.04, card_height - 0.04)
        
        # Title
        self.set_font('Helvetica', 'B', 10)
        self.set_text_color(30, 58, 95)
        self.set_xy(x, y + 0.1)
        self.cell(card_width, 0.2, 'WHAT TO SAY', align='C')
        
        # Phrases
        self.set_font('Helvetica', 'I', 6)
        self.set_text_color(60, 60, 60)
        phrases = [
            '"I am exercising my right to remain silent."',
            '"I do not consent to a search."',
            '"I want to speak with a lawyer."',
            '"Am I free to leave?"'
        ]
        
        y_pos = y + 0.35
        for phrase in phrases:
            self.set_xy(x + 0.1, y_pos)
            self.cell(card_width - 0.2, 0.12, phrase)
            y_pos += 0.12
            
        # Do Not section
        self.set_font('Helvetica', 'B', 6)
        self.set_text_color(220, 38, 38)  # Red
        self.set_xy(x + 0.1, y_pos + 0.05)
        self.cell(card_width - 0.2, 0.12, 'DO NOT:')
        
        self.set_font('Helvetica', '', 5)
        donots = ['Run or resist', 'Lie or provide false documents', 'Sign anything without a lawyer', 'Open door without judicial warrant']
        self.set_xy(x + 0.1, y_pos + 0.17)
        self.cell(card_width - 0.2, 0.1, ' | '.join(['X ' + d for d in donots]))
        
        # Emergency contact
        self.set_draw_color(30, 58, 95)
        self.line(x + 0.1, y + 1.5, x + card_width - 0.1, y + 1.5)
        
        self.set_font('Helvetica', 'B', 6)
        self.set_text_color(30, 58, 95)
        self.set_xy(x + 0.1, y + 1.55)
        self.cell(card_width - 0.2, 0.1, 'EMERGENCY CONTACT')
        
        self.set_font('Helvetica', '', 6)
        self.set_xy(x + 0.1, y + 1.65)
        self.cell(card_width - 0.2, 0.1, 'Amaral & Associates: 1-844-423-3733')
        
        self.set_xy(x + 0.1, y + 1.75)
        self.cell(card_width - 0.2, 0.1, 'Immigration Hotline: 1-844-423-3733')

def generate_pdf():
    """Generate the Know Your Rights PDF"""
    pdf = KnowYourRightsPDF()
    pdf.add_page()
    
    # Add title
    pdf.set_font('Helvetica', 'B', 16)
    pdf.set_text_color(30, 58, 95)
    pdf.set_xy(0.5, 0.5)
    pdf.cell(7.5, 0.3, 'Know Your Rights Card - Print & Cut', align='C')
    
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(100, 100, 100)
    pdf.set_xy(0.5, 0.85)
    pdf.cell(7.5, 0.2, 'Print on cardstock, cut along dotted lines, fold in half', align='C')
    
    # Add English cards
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(30, 58, 95)
    pdf.set_xy(0.5, 1.3)
    pdf.cell(3.5, 0.2, 'ENGLISH', align='C')
    
    # Draw cut lines (dotted)
    pdf.set_draw_color(150, 150, 150)
    pdf.set_line_width(0.01)
    
    # Card front position
    front_x = 0.5
    front_y = 1.6
    pdf.rect(front_x - 0.1, front_y - 0.1, 3.7, 2.2, 'D')
    pdf.add_card_front(front_x, front_y)
    
    # Card back position
    back_x = 4.5
    back_y = 1.6
    pdf.rect(back_x - 0.1, back_y - 0.1, 3.7, 2.2, 'D')
    pdf.add_card_back(back_x, back_y)
    
    # Add Spanish cards
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(30, 58, 95)
    pdf.set_xy(0.5, 4.2)
    pdf.cell(3.5, 0.2, 'SPANISH / ESPANOL', align='C')
    
    # Spanish front
    pdf.rect(front_x - 0.1, 4.5 - 0.1, 3.7, 2.2, 'D')
    pdf.add_card_front_spanish(front_x, 4.5)
    
    # Spanish back
    pdf.rect(back_x - 0.1, 4.5 - 0.1, 3.7, 2.2, 'D')
    pdf.add_card_back_spanish(back_x, 4.5)
    
    # Add Portuguese cards
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(30, 58, 95)
    pdf.set_xy(0.5, 7.1)
    pdf.cell(3.5, 0.2, 'PORTUGUESE / PORTUGUES', align='C')
    
    # Portuguese front
    pdf.rect(front_x - 0.1, 7.4 - 0.1, 3.7, 2.2, 'D')
    pdf.add_card_front_portuguese(front_x, 7.4)
    
    # Portuguese back
    pdf.rect(back_x - 0.1, 7.4 - 0.1, 3.7, 2.2, 'D')
    pdf.add_card_back_portuguese(back_x, 7.4)
    
    # Footer
    pdf.set_font('Helvetica', '', 8)
    pdf.set_text_color(100, 100, 100)
    pdf.set_xy(0.5, 10.3)
    pdf.cell(7.5, 0.2, 'Amaral & Associates, P.C. | www.amarallegal.com | 1-844-423-3733', align='C')
    
    # Output
    output_path = os.path.join(os.path.dirname(__file__), '..', 'client', 'public', 'downloads', 'know-your-rights-card.pdf')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    pdf.output(output_path)
    print(f"PDF generated: {output_path}")

# Add Spanish card methods
def add_card_front_spanish(self, x, y):
    card_width = 3.5
    card_height = 2
    
    self.set_fill_color(30, 58, 95)
    self.rect(x, y, card_width, card_height, 'F')
    
    self.set_draw_color(212, 175, 55)
    self.set_line_width(0.02)
    self.rect(x + 0.05, y + 0.05, card_width - 0.1, card_height - 0.1)
    
    self.set_font('Helvetica', 'B', 10)
    self.set_text_color(255, 255, 255)
    self.set_xy(x, y + 0.1)
    self.cell(card_width, 0.2, 'CONOZCA SUS DERECHOS', align='C')
    
    self.set_font('Helvetica', '', 8)
    self.set_text_color(212, 175, 55)
    self.set_xy(x, y + 0.3)
    self.cell(card_width, 0.15, 'CON ICE', align='C')
    
    self.set_font('Helvetica', '', 5)
    self.set_text_color(255, 255, 255)
    
    rights = [
        ("DERECHO A GUARDAR SILENCIO:", "No tiene que responder preguntas sobre donde nacio o su estatus migratorio."),
        ("DERECHO A NEGAR ENTRADA:", "ICE no puede entrar a su casa sin una orden judicial firmada por un juez."),
        ("DERECHO A UN ABOGADO:", "Tiene derecho a hablar con un abogado antes de responder preguntas."),
        ("DERECHO A NO FIRMAR:", "No firme documentos sin hablar primero con un abogado.")
    ]
    
    y_pos = y + 0.5
    for title, text in rights:
        self.set_font('Helvetica', 'B', 5)
        self.set_xy(x + 0.1, y_pos)
        self.cell(card_width - 0.2, 0.1, title)
        
        self.set_font('Helvetica', '', 5)
        self.set_xy(x + 0.1, y_pos + 0.1)
        self.multi_cell(card_width - 0.2, 0.08, text)
        y_pos += 0.35

def add_card_back_spanish(self, x, y):
    card_width = 3.5
    card_height = 2
    
    self.set_fill_color(255, 255, 255)
    self.rect(x, y, card_width, card_height, 'F')
    
    self.set_draw_color(30, 58, 95)
    self.set_line_width(0.02)
    self.rect(x + 0.02, y + 0.02, card_width - 0.04, card_height - 0.04)
    
    self.set_font('Helvetica', 'B', 10)
    self.set_text_color(30, 58, 95)
    self.set_xy(x, y + 0.1)
    self.cell(card_width, 0.2, 'QUE DECIR', align='C')
    
    self.set_font('Helvetica', 'I', 6)
    self.set_text_color(60, 60, 60)
    phrases = [
        '"Estoy ejerciendo mi derecho a guardar silencio."',
        '"No doy consentimiento para un registro."',
        '"Quiero hablar con un abogado."',
        '"Soy libre de irme?"'
    ]
    
    y_pos = y + 0.35
    for phrase in phrases:
        self.set_xy(x + 0.1, y_pos)
        self.cell(card_width - 0.2, 0.12, phrase)
        y_pos += 0.12
        
    self.set_font('Helvetica', 'B', 6)
    self.set_text_color(220, 38, 38)
    self.set_xy(x + 0.1, y_pos + 0.05)
    self.cell(card_width - 0.2, 0.12, 'NO HAGA:')
    
    self.set_font('Helvetica', '', 5)
    self.set_xy(x + 0.1, y_pos + 0.17)
    self.cell(card_width - 0.2, 0.1, 'X Correr | X Mentir | X Firmar sin abogado | X Abrir sin orden')
    
    self.set_draw_color(30, 58, 95)
    self.line(x + 0.1, y + 1.5, x + card_width - 0.1, y + 1.5)
    
    self.set_font('Helvetica', 'B', 6)
    self.set_text_color(30, 58, 95)
    self.set_xy(x + 0.1, y + 1.55)
    self.cell(card_width - 0.2, 0.1, 'CONTACTO DE EMERGENCIA')
    
    self.set_font('Helvetica', '', 6)
    self.set_xy(x + 0.1, y + 1.65)
    self.cell(card_width - 0.2, 0.1, 'Amaral & Associates: 1-844-423-3733')

# Add Portuguese card methods
def add_card_front_portuguese(self, x, y):
    card_width = 3.5
    card_height = 2
    
    self.set_fill_color(30, 58, 95)
    self.rect(x, y, card_width, card_height, 'F')
    
    self.set_draw_color(212, 175, 55)
    self.set_line_width(0.02)
    self.rect(x + 0.05, y + 0.05, card_width - 0.1, card_height - 0.1)
    
    self.set_font('Helvetica', 'B', 10)
    self.set_text_color(255, 255, 255)
    self.set_xy(x, y + 0.1)
    self.cell(card_width, 0.2, 'CONHECA SEUS DIREITOS', align='C')
    
    self.set_font('Helvetica', '', 8)
    self.set_text_color(212, 175, 55)
    self.set_xy(x, y + 0.3)
    self.cell(card_width, 0.15, 'COM ICE', align='C')
    
    self.set_font('Helvetica', '', 5)
    self.set_text_color(255, 255, 255)
    
    rights = [
        ("DIREITO DE PERMANECER EM SILENCIO:", "Voce nao precisa responder perguntas sobre onde nasceu ou seu status."),
        ("DIREITO DE RECUSAR ENTRADA:", "O ICE nao pode entrar em sua casa sem um mandado judicial."),
        ("DIREITO A UM ADVOGADO:", "Voce tem o direito de falar com um advogado antes de responder."),
        ("DIREITO DE NAO ASSINAR:", "Nao assine documentos sem falar primeiro com um advogado.")
    ]
    
    y_pos = y + 0.5
    for title, text in rights:
        self.set_font('Helvetica', 'B', 5)
        self.set_xy(x + 0.1, y_pos)
        self.cell(card_width - 0.2, 0.1, title)
        
        self.set_font('Helvetica', '', 5)
        self.set_xy(x + 0.1, y_pos + 0.1)
        self.multi_cell(card_width - 0.2, 0.08, text)
        y_pos += 0.35

def add_card_back_portuguese(self, x, y):
    card_width = 3.5
    card_height = 2
    
    self.set_fill_color(255, 255, 255)
    self.rect(x, y, card_width, card_height, 'F')
    
    self.set_draw_color(30, 58, 95)
    self.set_line_width(0.02)
    self.rect(x + 0.02, y + 0.02, card_width - 0.04, card_height - 0.04)
    
    self.set_font('Helvetica', 'B', 10)
    self.set_text_color(30, 58, 95)
    self.set_xy(x, y + 0.1)
    self.cell(card_width, 0.2, 'O QUE DIZER', align='C')
    
    self.set_font('Helvetica', 'I', 6)
    self.set_text_color(60, 60, 60)
    phrases = [
        '"Estou exercendo meu direito de permanecer em silencio."',
        '"Nao consinto com uma busca."',
        '"Quero falar com um advogado."',
        '"Estou livre para ir?"'
    ]
    
    y_pos = y + 0.35
    for phrase in phrases:
        self.set_xy(x + 0.1, y_pos)
        self.cell(card_width - 0.2, 0.12, phrase)
        y_pos += 0.12
        
    self.set_font('Helvetica', 'B', 6)
    self.set_text_color(220, 38, 38)
    self.set_xy(x + 0.1, y_pos + 0.05)
    self.cell(card_width - 0.2, 0.12, 'NAO FACA:')
    
    self.set_font('Helvetica', '', 5)
    self.set_xy(x + 0.1, y_pos + 0.17)
    self.cell(card_width - 0.2, 0.1, 'X Correr | X Mentir | X Assinar sem advogado | X Abrir sem mandado')
    
    self.set_draw_color(30, 58, 95)
    self.line(x + 0.1, y + 1.5, x + card_width - 0.1, y + 1.5)
    
    self.set_font('Helvetica', 'B', 6)
    self.set_text_color(30, 58, 95)
    self.set_xy(x + 0.1, y + 1.55)
    self.cell(card_width - 0.2, 0.1, 'CONTATO DE EMERGENCIA')
    
    self.set_font('Helvetica', '', 6)
    self.set_xy(x + 0.1, y + 1.65)
    self.cell(card_width - 0.2, 0.1, 'Amaral & Associates: 1-844-423-3733')

# Add methods to class
KnowYourRightsPDF.add_card_front_spanish = add_card_front_spanish
KnowYourRightsPDF.add_card_back_spanish = add_card_back_spanish
KnowYourRightsPDF.add_card_front_portuguese = add_card_front_portuguese
KnowYourRightsPDF.add_card_back_portuguese = add_card_back_portuguese

if __name__ == "__main__":
    generate_pdf()
