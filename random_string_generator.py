import random
import string

def generate_random_string(length):
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(length))

# Example usage
random_string = generate_random_string(10)
print(random_string)


