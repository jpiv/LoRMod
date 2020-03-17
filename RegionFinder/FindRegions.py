import time
import json
import cv2 as cv 
import numpy as np
from mss.windows import MSS as mss
from PIL import Image
from screeninfo import get_monitors
import sys
sys.stdout.flush()

WHITE_VAL_THRESH = 0.008
region_color_bounds = {
	"si": [
		np.array([69, 110, 5]),
		np.array([215, 225, 24]),
	],
	"noxus": [
		np.array([19, 21, 111]),
		np.array([106, 110, 246]),
	],
	"pnz": [
		np.array([66, 159, 211]),
		np.array([106, 200, 253]),
	],
	"freljord": [
		np.array([222, 188, 92]),
		np.array([250, 232, 188]),
	],
	"ionia": [
		np.array([123, 89, 189]),
		np.array([185, 174, 214]),
	],
	"demacia": [
		np.array([156, 201, 222]),
		np.array([227, 235, 243]),
	],
}

region_size = None

def show_image(image):
	pass
	# cv.imshow('image', image)
	# cv.waitKey(500)

def load_region_image():
	screen_cap = None
	monitor = get_monitors()[0]
	print('Monitor:', monitor)
	capture_area = {
		# "left": int(0.11718 * monitor.width + 3720),
		"left": int(0.11718 * monitor.width),
		# "top": int(0.9166 * monitor.height),
		"top": 0,
		"width": int(0.05208 * monitor.width),
		"height": int(0.09259 * monitor.height),
	}
	global region_size
	region_size = (int)(0.05208 * monitor.width) * (0.09259 * monitor.height)
	with mss() as cap:
		screen_cap = cap.grab(capture_area)
	img_data = np.array(Image.frombytes('RGB', screen_cap.size, screen_cap.rgb))
	bgr_img_data = cv.cvtColor(img_data, cv.COLOR_RGB2BGR)
	show_image(bgr_img_data)
	return bgr_img_data

def filter_region_image(region_img):
	regions = []
	for region, (lower, upper) in region_color_bounds.items():
		filtered_image = cv.inRange(region_img, lower, upper)
		show_image(filtered_image)
		white_value = 0
		for row in filtered_image:
			for pixel in row:
				if pixel == 255:
					white_value += 1
		print('white value:', white_value / region_size)
		if white_value / region_size >= WHITE_VAL_THRESH:
			regions.append(region)
	return regions

cropped_image = load_region_image()
found_regions = filter_region_image(cropped_image)
print(json.dumps(found_regions))
# time.sleep(100)