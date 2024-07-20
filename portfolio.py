from flask import Flask, render_template, request, jsonify
import smtplib

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_email', methods=['POST'])
def send_email():
    data = request.json
    # Implement email sending logic here
    # Use smtplib to send an email with the form data
    try:
        # Set up the server and email details
        server = smtplib.SMTP('smtp.example.com', 587)
        server.starttls()
        server.login("your_email@example.com", "your_password")
        
        subject = "New Contact Form Submission"
        body = f"Name: {data['name']}\nEmail: {data['email']}\nMessage: {data['message']}"
        message = f"Subject: {subject}\n\n{body}"
        
        server.sendmail("your_email@example.com", "recipient@example.com", message)
        server.quit()
        
        return jsonify({"success": True, "message": "Email sent successfully"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@app.route('/videos', methods=['GET'])
def get_videos():
    videos = [
        {"title": "Introduction to Data Science", "url": "https://www.youtube.com/watch?v=example1", "thumbnail": "images/data-science-thumbnail1.jpg"},
        {"title": "Machine Learning Basics", "url": "https://www.youtube.com/watch?v=example2", "thumbnail": "images/machine-learning-thumbnail.jpg"},
        # Add more video entries
    ]
    return jsonify(videos)

@app.route('/achievements', methods=['GET'])
def get_achievements():
    achievements = [
        {"title": "Top Data Science Competition Winner", "description": "Recognized for outstanding performance in the annual Data Science Global Challenge. Awarded first place among 500+ participants.", "icon": "images/award-icon.png"},
        {"title": "Certified Data Scientist", "description": "Earned a certification in Data Science from XYZ University, demonstrating expertise in machine learning, statistical analysis, and data visualization.", "icon": "images/certificate-icon.png"},
        # Add more achievement entries
    ]
    return jsonify(achievements)

if __name__ == '__main__':
    app.run(debug=True)
