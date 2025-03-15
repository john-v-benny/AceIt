from rest_framework.decorators import api_view
from rest_framework.response import Response
from transformers import pipeline
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")  # Get the token from the .env file

generator = pipeline(
    "text-generation",
    model="TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    token=HF_TOKEN  # Use the secure token
)

@api_view(['POST'])
def generate_questions(request):
    skills = request.data.get("skills", [])
    
    if not skills:
        return Response({"error": "No skills provided"}, status=400)

    # Improved prompt with an example
    prompt = (

        f"Generate 5 detailed interview questions for the following skills: {', '.join(skills)}. "
        f"Each question should be complete and relevant to the skills mentioned. "
        f"Ensure the questions are suitable for a technical interview and cover various aspects of the skills. "
        f"Provide the questions in a clear and concise format, one per line. "
        f"For example:\n"
        f"1. How do you handle memory management in Python?\n"
        f"2. What are the key features of Django's ORM?\n"
        f"3. Can you explain the difference between supervised and unsupervised learning?\n"
        f"4. How would you optimize a Django application for scalability?\n"
        f"5. What is the difference between a list and a tuple in Python?"

    )
    
    try:
        response = generator(
            prompt, 
            max_length=500,  # Increased max_length to allow for more detailed questions
            num_return_sequences=1, 
            temperature=1,  # Adjusts randomness
            truncation=True  
        )

        # Extract generated text
        generated_text = response[0]["generated_text"]

        # Remove the prompt text from the generated output
        generated_text = generated_text.replace(prompt, "").strip()

        # Split into separate questions (better parsing)
        questions = [q.strip() for q in generated_text.split("\n") if q.strip()]

        # Ensure at least one question is returned
        if not questions:
            return Response({"error": "Failed to generate valid questions"}, status=500)

        return Response({"questions": questions})

    except Exception as e:
        return Response({"error": str(e)}, status=500)