from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

@frappe.whitelist(allow_guest=True)
def set_form_data(lead_name, subject , msg, title, email):
	data = frappe.new_doc("Lead")
	data.lead_name = lead_name
	data.message = subject
	data.mobile_no = msg
	data.source = 'Website'
	data.notes = title
	data.email_id = email
	data.save(ignore_permissions=True)
	frappe.db.commit()

@frappe.whitelist(allow_guest=True)
def set_form_contact_data(lead_name,company_name, mobile_no, title, email):
	data = frappe.new_doc("Lead")
	data.lead_name = lead_name
	data.company_name = company_name
	data.mobile_no = mobile_no
	data.source = 'Website'
	data.notes = title
	data.email_id = email
	data.save(ignore_permissions=True)
	
	frappe.db.commit()

def add_preload_headers(response):
	pass