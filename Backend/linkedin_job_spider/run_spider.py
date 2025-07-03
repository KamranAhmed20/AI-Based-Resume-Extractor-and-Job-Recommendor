import os
import sys
import json
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

def save_params_to_file(user_id, password, city, cv_path, save_path):
    params = {
        'user_id': user_id,
        'password': password,
        'city': city,
        'cv_path': cv_path
    }
    with open(save_path, 'w') as f:
        json.dump(params, f, indent=4)

def run_spider(user_id, password, city, cv_path):
    spider_project_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'linkedin_job_spider'))
    sys.path.append(spider_project_path)
    os.chdir(spider_project_path)

    # Save parameters to a JSON file
    save_params_to_file(user_id, password, city, cv_path, 'spider_params.json')

    settings = get_project_settings()
    process = CrawlerProcess(settings)

    process.crawl(
        'linkedin_jobs',
        user_id=user_id,
        password=password,
        city=city,
        cv=cv_path
    )
    process.start()

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python run_spider.py <user_id> <password> <city> <cv_path>")
        sys.exit(1)

    user_id = sys.argv[1]
    password = sys.argv[2]
    city = sys.argv[3]
    cv_path = sys.argv[4]

    run_spider(user_id, password, city, cv_path)