# import os
# import html

 
# #generate and print to text file all the html needed for the music
# #Pull from music dir

# dir = "./music/"
# #List of artist 
# #Format generally follows artist, song, instrument

# def processPDF()->list[dict]:
#     music = []
#     for filename in os.listdir(dir):
#         data = filename.split('.')
#         data2 = {
#             "filepath":"./music/"+filename,
#             "artist":data[0],
#             "song":data[1],
#             "instrument":data[2],
#             "html":""
#         }
#         music.append(data2)
#     return music

# def generateHTML(music:list)->list[dict]:
#     for item in music:
#         filepath = html.escape(item["filepath"])
#         artist = html.escape(item["artist"])
#         song = html.escape(item["song"])
#         instrument = html.escape(item["instrument"])

#         item["html"] = (
#             f'<a href="{filepath}" target="_blank">'
#             f'{artist} - {song} ({instrument})'
#             f'</a>'
#         )

#     return music

import os
from collections import defaultdict
import html

MUSIC_DIR = "./music"
HTML_FILE = "./index.html"

START_TAG = "<!-- MUSIC_START -->"
END_TAG   = "<!-- MUSIC_END -->"


def processPDF():
    grouped = defaultdict(list)

    for filename in os.listdir(MUSIC_DIR):

        full_path = os.path.join(MUSIC_DIR, filename)

        if not os.path.isfile(full_path):
            continue

        name, ext = os.path.splitext(filename)

        parts = name.split(".")

        # Artist.Song.Instrument.pdf
        if len(parts) < 3:
            continue

        artist = parts[0]
        song = parts[1]
        instrument = parts[2]

        grouped[(artist, song)].append({
            "instrument": instrument,
            "filepath": full_path
        })

    return grouped


def generateHTML(grouped):
    sorted_items = sorted(grouped.items(), key=lambda x: len(x[1]), reverse=True)

    recommendations = ""

    output = '''

    <div id="recommendationPopup" class="recommendation-popup"></div>
</div>

<div class="music-grid">
'''

    for (artist, song), instruments in sorted_items:
        artist_safe = html.escape(artist)
        song_safe = html.escape(song)

        output += f'''
<div class="piece-block">
    <h2>{artist_safe}: {song_safe}</h2>

    <ul>
'''

        for item in instruments:
            instrument = html.escape(item["instrument"])
            filepath = html.escape(item["filepath"])

            full_name = f"{artist}: {song} - {instrument}"
            full_name_safe = html.escape(full_name)

            recommendations += f'''
<div class="recommendation-item" data-search="{html.escape(full_name.lower())}">
    <span>{full_name_safe}</span>

    <a class="popup-download-btn" href="{filepath}" download>
        Download
    </a>
</div>
'''

            output += f'''
        <li>
            <a href="{filepath}" target="_blank">{instrument}</a>
        </li>
'''

        output += '''
    </ul>
</div>
'''

    output += f'''
</div>

<div id="recommendationData" style="display:none;">
{recommendations}
</div>
'''

    return output


def updateHTMLFile(html_path, generated_html):

    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()

    start_index = content.find(START_TAG)
    end_index = content.find(END_TAG)

    if start_index == -1 or end_index == -1:
        raise Exception("Could not find HTML comment tags")

    start_index += len(START_TAG)

    new_content = (
        content[:start_index]
        + "\n\n"
        + generated_html
        + "\n"
        + content[end_index:]
    )

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_content)


music = processPDF()
generated_html = generateHTML(music)

updateHTMLFile(HTML_FILE, generated_html)

print("HTML updated successfully.")