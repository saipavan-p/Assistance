from openai import OpenAI
import shelve
import os
import time
from dotenv import load_dotenv
load_dotenv()

OPEN_AI_API_KEY=os.getenv("OPEN_AI_API_KEY")
client = OpenAI(api_key=OPEN_AI_API_KEY)


file_ids = ['file-z7tuXK8htOBM0oOcHwbsYXNU', 'file-nOCRLdziODdzNIhZEPPwSb8m']

def check_if_thread_exists(u_id):
    with shelve.open("threads_db") as threads_shelf:
        return threads_shelf.get(u_id, None)

def store_thread(u_id, thread_id):
    with shelve.open("threads_db", writeback=True) as threads_shelf:
        threads_shelf[u_id] = thread_id

def generate_response(message_body, u_id, name):
    thread_id = check_if_thread_exists(u_id)

    if thread_id is None:
        print(f"Creating new thread for {name} with u_id {u_id}")
        thread = client.beta.threads.create()
        store_thread(u_id, thread.id)
        thread_id = thread.id

    else:
        print(f"Retrieving existing thread for {name} with u_id {u_id}")
        thread = client.beta.threads.retrieve(thread_id)

    message = client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=message_body,
    )

    new_message = run_assistant(thread)
    print(f"To {name}:", new_message)
    return new_message

def run_assistant(thread):
    assistant = client.beta.assistants.retrieve("asst_Ge8oID2sssQ34EEPWEUBsbHR")
    run = client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=assistant.id,
    )

    while run.status != "completed":
        time.sleep(0.5)
        run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)

    messages = client.beta.threads.messages.list(thread_id=thread.id)
    new_message = messages.data[0].content[0].text.value
    return new_message
