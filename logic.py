def process_name(name):
    """
    Complex function to process a name.
    - Reverse the name.
    - Count the number of vowels.
    - Return a formatted response.
    """
    vowels = 'aeiouAEIOU'
    reversed_name = name[::-1]
    vowel_count = sum(1 for char in name if char in vowels)
    
    return {
        "original": name,
        "reversed": reversed_name,
        "vowel_count": vowel_count,
        "message": f"Hello, {name}! Your name reversed is '{reversed_name}', and it contains {vowel_count} vowels."
    }
