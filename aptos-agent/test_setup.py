import os
from dotenv import load_dotenv
import openai

load_dotenv()

def test_openai_connection():
    """Test OpenAI API connection"""
    try:
        openai.api_key = os.getenv('OPENAI_API_KEY')
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Say hello!"}]
        )
        print("OpenAI Connection Test:", response.choices[0].message.content)
        return True
    except Exception as e:
        print(f"OpenAI Connection Error: {str(e)}")
        return False

def test_aptos_connection():
    """Test Aptos connection"""
    from agents import get_balance_in_apt_sync
    try:
        balance = get_balance_in_apt_sync()
        print(f"Aptos Connection Test - Balance: {balance}")
        return True
    except Exception as e:
        print(f"Aptos Connection Error: {str(e)}")
        return False

if __name__ == "__main__":
    print("Testing connections...")
    openai_ok = test_openai_connection()
    aptos_ok = test_aptos_connection()
    
    if openai_ok and aptos_ok:
        print("\n✅ All connections successful!")
    else:
        print("\n❌ Some connections failed. Check errors above.")